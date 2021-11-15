/**
 * Common utilities library
 */
import Noty from 'noty';

/**
 * Notify success message 
 * 
 * @param {*} message - Text to be displayed
 */
function notifySuccess(message) {
    new Noty({
        text: message,
        theme: 'metroui',
        type: 'success',
        layout: 'topCenter',
        timeout: 10000,
        progressBar: true
    }).show();
}

/**
 * Notify error message 
 * 
 * @param {*} message 
 */
function notifyError(message) {
    new Noty({
        text: message,
        theme: 'metroui',
        type: 'error',
        layout: 'topCenter',
        timeout: 10000,
        progressBar: true
    }).show();
}

const SMARTLOCK_STATUS = {
    0: 'Created',
    1: 'Initiated',
    2: 'Released',
    3: 'Withdrawn'
}

/**
 * Export all the functions
 */
export default {
    notifySuccess,
    notifyError,
    SMARTLOCK_STATUS
}