import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaFilePdf } from 'react-icons/fa';
import { MdDelete, MdFileDownload } from 'react-icons/md';
import PropTypes from 'prop-types';
import UploadFileModal from './UploadFileModal';
import {
  getPlayerFiles,
  deletePlayerFile,
  getTeamFiles,
} from '../../utils/documentation/documentation';
import './Documentation.scss';

const Documentation = () => {
  const { team, isAdmin } = useSelector((store) => {
    const team = store.user.teams[store.status.selected_team];
    return {
      team: team,
      isAdmin: team.permission_level === 1 || team.permission_level === 2,
    };
  });

  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState({
    user_files: [],
    team_files: [],
  });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function initState() {
      // Check permission level and make appropriate API call
      let response = await getPlayerFiles(team.team_id);

      if (!response.success || response.error) {
        setError(
          'Unable to retrieve documents at this time. Please try again later'
        );
        return;
      }

      const user_files = response.files;
      let team_files;
      if (isAdmin) {
        response = await getTeamFiles(team.team_id);

        if (!response.success || response.error) {
          setError(
            'Unable to retrieve documents at this time. Please try again later'
          );
          setLoading(false);
          return;
        }

        team_files = response.files;
      }
      setFiles({
        user_files: user_files,
        team_files: team_files !== undefined ? team_files : [],
      });
      setLoading(false);
    }
    initState();
  }, [team.team_id]);

  function addLocalUserFile(file) {
    const { user_files, team_files } = files;
    user_files.push(file);

    if (isAdmin) {
      team_files.push(file);
    }

    setFiles({ user_files: user_files, team_files: team_files });
    setLoading(false);
  }

  function removeLocalUserFile(file_id) {
    const { user_files, team_files } = files;
    user_files.splice(
      user_files.findIndex((file) => file.file_id === file_id),
      1
    );

    if (isAdmin) {
      team_files.splice(
        team_files.findIndex((file) => file.file_id === file_id),
        1
      );
    }

    setFiles({ user_files: user_files, team_files: team_files });
    setLoading(false);
  }

  return loading ? (
    <div className="fill-vert" />
  ) : (
    <>
      <div className="fill-vert d-flex flex-column align-items-center">
        <UploadFileModal
          show={show}
          setShow={setShow}
          team_id={team.team_id}
          addFile={addLocalUserFile}
        />
        <div className="w-75 mw-75">
          <div className="py-4">
            <span className="documentation-title-heading">
              Manage Documents
            </span>
          </div>
          <div className="pb-3">
            <span className="documentation-title-subheading">My Documents</span>
          </div>
          {files.user_files.length > 0 ? (
            <UserDocumentsList
              user_files={files.user_files}
              removeLocalUserFile={removeLocalUserFile}
              setError={setError}
            />
          ) : (
            <span className="documentation-title-body">
              You have not yet uploaded any files
            </span>
          )}
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center">
              {error.length > 0 && (
                <div className="pt-2">
                  <small className="form-text d-block invalid-feedback">
                    {error}
                  </small>
                </div>
              )}
              <div className="pt-4 pb-2">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={() => setShow(true)}
                >
                  Upload File
                </button>
              </div>
            </div>
          </div>
          {isAdmin && (
            <>
              <div className="py-3">
                <span className="documentation-title-subheading">
                  Team Documents
                </span>
              </div>
              {files.team_files.length > 0 ? (
                <TeamDocumentsList team_files={files.team_files} />
              ) : (
                <span className="documentation-title-body">
                  No team documents have been uploaded at this time
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

const UserDocumentsList = (props) => {
  const { user_files, removeLocalUserFile, setError } = props;

  return (
    <div className="d-flex flex-column align-items-center">
      {user_files.map((file) => {
        return (
          <FileRow
            file={file}
            deletable
            removeLocalUserFile={removeLocalUserFile}
            setError={setError}
          />
        );
      })}
    </div>
  );
};

UserDocumentsList.propTypes = {
  user_files: PropTypes.arrayOf(Object).isRequired,
  removeLocalUserFile: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

const TeamDocumentsList = (props) => {
  const { team_files } = props;

  return (
    <div className="d-flex flex-column align-items-center">
      {team_files.map((file) => {
        return <FileRow file={file} deletable={false} />;
      })}
    </div>
  );
};

TeamDocumentsList.propTypes = {
  team_files: PropTypes.arrayOf(Object).isRequired,
};

const FileRow = (props) => {
  const { file, deletable, setError, removeLocalUserFile } = props;

  async function onDelete() {
    const { success, error } = await deletePlayerFile(file.file_id);

    if (success && !error) {
      removeLocalUserFile(file.file_id);
      setError('');
    } else {
      setError(
        'Unable to delete the specified file at this time. Please try again later'
      );
    }
  }

  return (
    <div className="border border-dark w-100">
      <div className="d-flex w-100 justify-content-between align-items-center">
        <FaFilePdf size={50} />
        <span className="documentation-file-title d-inline">
          {file.name.length > 60
            ? `${file.name.substring(0, 57)}...`
            : file.name}
        </span>
        <div className="d-flex">
          {deletable && <MdDelete size={50} onClick={() => onDelete()} />}
          <a
            style={{ color: 'black' }}
            href={file.url}
            download
            onClick={() => setError('')}
          >
            <MdFileDownload size={50} />
          </a>
        </div>
      </div>
    </div>
  );
};

FileRow.propTypes = {
  file: PropTypes.object.isRequired,
  deletable: PropTypes.bool.isRequired,
  removeLocalUserFile: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default Documentation;
