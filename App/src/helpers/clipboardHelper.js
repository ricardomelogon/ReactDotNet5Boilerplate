import { actionsToast } from '../redux';

const CopyToClipboardFallback = (text, dispatch) => {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        let successful = document.execCommand('copy');
        if (dispatch) {
            actionsToast.showToast(dispatch, {
                message: successful ? 'Value copied!' : 'Error: could not copy the text!',
            });
        }
    } catch (err) {
        if (dispatch) {
            actionsToast.showToast(dispatch, {
                message: 'Error: could not copy the text!'
            });
        }
    }
    document.body.removeChild(textArea);
};

const CopyToClipboard = (text, dispatch) => {
    if (!navigator.clipboard) {
        CopyToClipboardFallback(text, dispatch);
        return;
    }
    navigator.clipboard.writeText(text).then(
        () => {
            if (dispatch) {
                actionsToast.showToast(dispatch, {
                    message: 'Value copied!'
                });
            }
        },
        () => {
            if (dispatch) {
                actionsToast.showToast(dispatch, {
                    message: 'Error: could not copy the text!'
                });
            }
        }
    );
};

export default CopyToClipboard;