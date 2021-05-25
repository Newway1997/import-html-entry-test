import importHTMLWithEvalCache from './with-eval-code';

importHTMLWithEvalCache('./subApp/index.html')
    .then(res => {
        res.execScripts()
});
