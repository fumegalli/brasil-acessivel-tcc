import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {       
        backgroundColor: '#fff',
        minWidth: 600,
        minHeight: 500,
        borderRadius: 5
    },
    formGroup: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        padding: 16
    },
    title: {
        textAlign: 'center',
        fontWeight: 500,
        padding: 16,
        paddingBottom: 0,
    },
    actionsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 15
    },
    cancelButton: {
        marginRight: 20
    },
    divider: {
        borderBottom: '1px solid #e6e6e6'
    }
}));
