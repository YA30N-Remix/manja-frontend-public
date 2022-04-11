import React, { Component } from "react";
import { connect } from "react-redux";
import fileServices from "../../services/file.services";

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: undefined,
      progressInfos: [],
      message: [],
      fileIds: props.fileIds ? props.fileIds : [],
    };
  }

  selectFile(event) {
    this.setState(
      {
        progressInfos: [],
        selectedFiles: event.target.files,
      },
      () => this.uploadFiles()
    );
  }

  uploadFiles() {
    const selectedFiles = this.state.selectedFiles;

    let _progressInfos = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
    }

    this.setState(
      {
        progressInfos: _progressInfos,
        message: [],
      },
      () => {
        for (let i = 0; i < selectedFiles.length; i++) {
          this.upload(i, selectedFiles[i]);
        }
      }
    );
  }

  upload(idx, file) {
    let _progressInfos = [...this.state.progressInfos];

    fileServices
      .Upload(
        file,
        this.props.attachmentType,
        this.props.auth.token,
        (event) => {
          _progressInfos[idx].percentage = Math.round(
            (100 * event.loaded) / event.total
          );
          this.setState({
            _progressInfos,
          });
        }
      )
      .then((response) => {
        response = response.data;
        if (response.success) {
          const { fileId } = response;

          this.setState(
            (prev) => {
              let nextMessage = [
                ...prev.message,
                "Uploaded the file successfully: " + file.name,
              ];

              let nextFileIds = [...prev.fileIds, fileId];
              return {
                message: nextMessage,
                fileIds: nextFileIds,
              };
            },
            () => {
              if (this.props.multipleFiles) {
                this.props.saveResult(this.state.fileIds);
              } else {
                this.props.saveResult(fileId);
              }
            }
          );
        } else {
          _progressInfos[idx].percentage = 0;
          this.setState((prev) => {
            let nextMessage = [
              ...prev.message,
              "Could not upload the file: " + file.name,
            ];
            return {
              progressInfos: _progressInfos,
              message: nextMessage,
            };
          });
        }
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Could not upload the file: " + file.name,
          ];
          return {
            progressInfos: _progressInfos,
            message: nextMessage,
          };
        });
      });
  }

  render() {
    const { selectedFiles, progressInfos, message } = this.state;
    const { multipleFiles, validationResult } = this.props;
    return (
      <div>
        {progressInfos &&
          progressInfos.map((progressInfo, index) => (
            <div className="mb-2" key={index}>
              <span>{progressInfo.fileName}</span>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-info"
                  role="progressbar"
                  aria-valuenow={progressInfo.percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: progressInfo.percentage + "%" }}
                >
                  {progressInfo.percentage}%
                </div>
              </div>
            </div>
          ))}

        <div className="row my-3">
          <div className="col-12">
            {multipleFiles ? (
              <input
                type="file"
                multiple
                className={`form-control ${validationResult}`}
                onChange={(event) => this.selectFile(event)}
                disabled={selectedFiles ? true : false}
              />
            ) : (
              <input
                type="file"
                className={`form-control ${validationResult}`}
                onChange={(event) => this.selectFile(event)}
                disabled={selectedFiles ? true : false}
              />
            )}
            {this.props.children}
          </div>
        </div>

        {message.length > 0 && (
          <div className="alert alert-secondary" role="alert">
            <ul>
              {message.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ user: { auth } }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Uploader);
