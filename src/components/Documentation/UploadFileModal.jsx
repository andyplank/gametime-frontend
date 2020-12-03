import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createPlayerFile } from '../../utils/documentation/documentation';

const UploadFileModal = (props) => {
  const { show, setShow, team_id, addFile } = props;

  const [file, setFile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleFileChange(event) {
    event.preventDefault();

    const selected_file = event.target.files ? event.target.files[0] : '';

    // Retrieve file data and validate
    if (selected_file.name.length > 256) {
      setError('File name must not exceed 256 characters');
      return;
    }

    if (selected_file.size > 30 * 1024 ** 2) {
      setError('File size must not exceed 30MB.');
      return;
    }

    setError('');
    setFile(selected_file);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    setLoading(true);

    async function File2Base64(fil) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(fil);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
      });
    }

    // Retrieve file data and validate
    if (file.name.length > 256) {
      setError('File name must not exceed 256 characters');
      setLoading(false);
      return;
    }

    if (file.size > 30 * 1024 ** 2) {
      setError('File size must not exceed 30MB.');
      setLoading(false);
      return;
    }

    let fileString;
    try {
      fileString = await File2Base64(file);
    } catch (err) {
      setFile('');
      setError(
        'Failed to process the selected file. It may be corrupted or not PDF-compliant'
      );
      setLoading(false);
      return;
    }

    // Attempt to upload file to backend
    try {
      const result = await createPlayerFile(team_id, file.name, fileString);

      if (result.success && !result.error) {
        addFile({
          name: file.name,
          file_id: result.file.file_id,
          url: result.file.url,
        });
        setError('');
        setLoading(false);
        setShow(false);
        return;
      }

      setError('Failed to upload file. Please try again later');
      setLoading(false);
    } catch (e) {
      setError('Failed to upload file. Please try again later');
      setLoading(false);
    }
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
        setError('');
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>File Uploader</Modal.Title>
      </Modal.Header>
      <Form
        noValidate
        /* onSubmit={handleSubmitForm(onSubmit)} */ autoComplete="off"
      >
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select a file</Form.Label>
            <Form.Control
              type="file"
              name="files"
              accept="application/pdf"
              className="btn no-padding"
              onChange={handleFileChange}
              isInvalid={error !== ''}
              // ref={register({
              //     required: "Required",
              //     pattern: {
              //       value: /^.*\.(jpg|JPG|jpeg|JPEG)$/,
              //       message: "Must be a JPG file"
              //     }
              //   }
              // )}
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Form.Group className="py-2">
            <Button
              className="mx-3"
              id="CancelModalButton"
              type="button"
              variant="secondary"
              disabled={loading}
              onClick={() => {
                setFile('');
                setError('');
                setShow(false);
              }}
            >
              Cancel
            </Button>
            <Button
              id="SubmitFileUploadButton"
              type="submit"
              variant="primary"
              disabled={loading || error !== ''}
              onClick={!loading || error !== '' ? handleSubmitForm : null}
            >
              Upload
            </Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

UploadFileModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  team_id: PropTypes.string.isRequired,
  addFile: PropTypes.func.isRequired,
};

export default UploadFileModal;
