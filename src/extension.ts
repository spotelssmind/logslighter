// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {

	let timeout: NodeJS.Timer | undefined = undefined;

	const messageQueuedKeywordDecorationType = vscode.window.createTextEditorDecorationType({
		backgroundColor: { id: 'logslighter.messageQueuedKeyword' },
	});

	const redErrorDecorationType = vscode.window.createTextEditorDecorationType({
		fontWeight: "bold",
		//cursor: 'crosshair',
		backgroundColor: { id: 'logslighter.error_red' }
	});

	const greenDecorationType = vscode.window.createTextEditorDecorationType({
		fontWeight: "bold",
		backgroundColor: { id: 'logslighter.green' }
	});

	const statusDecorationType = vscode.window.createTextEditorDecorationType({
		fontWeight: "bold",
		backgroundColor: { id: 'logslighter.status' }
	});

	const yellowDecorationType = vscode.window.createTextEditorDecorationType({
		backgroundColor: { id: 'logslighter.yellow' }
	});

	const darkOrangeDecorationType = vscode.window.createTextEditorDecorationType({
		backgroundColor: { id: 'logslighter.dark_orange' }
	});

	const commentsDecorationType = vscode.window.createTextEditorDecorationType({
		color: { id: 'logslighter.comment_orange' }
	});

	const finalVerdictDecorationType = vscode.window.createTextEditorDecorationType({
		backgroundColor: { id: 'logslighter.final_verdict' }
	});

	const timestampVerdictDecorationType = vscode.window.createTextEditorDecorationType({
		color: { id: 'logslighter.blue' }
	});

	const infoDecorationType = vscode.window.createTextEditorDecorationType({
		fontWeight: "bold",
		color: { id: 'logslighter.info' }
	});

	const traceDecorationType = vscode.window.createTextEditorDecorationType({
		fontWeight: "bold",
		color: { id: 'logslighter.trace' }
	});

	const debugDecorationType = vscode.window.createTextEditorDecorationType({
		fontWeight: "bold",
		color: { id: 'logslighter.debug' }
	});

	const messageDecorationType = vscode.window.createTextEditorDecorationType({
		color: { id: 'logslighter.message' }
	});

	const ipAddressDecorationType = vscode.window.createTextEditorDecorationType({
		fontWeight: "bold",
		color: { id: 'logslighter.ipAddress' }
	});

	const expectedDecorationType = vscode.window.createTextEditorDecorationType({
		backgroundColor: { id: 'logslighter.light_green' }
	});

	let activeEditor = vscode.window.activeTextEditor;

	function updateAllDecorations() {
		if (!activeEditor) {
			return;
		}
		const messageQueuedRegExKeyWord = /(\bMessage Queued\b)/g;
		const messageQueuedKeyWordText = activeEditor.document.getText();
		const messageQueuedKeyword: vscode.DecorationOptions[] = [];
		let matchKeyword;
		while (matchKeyword = messageQueuedRegExKeyWord.exec(messageQueuedKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchKeyword.index);
			const endPos = activeEditor.document.positionAt(matchKeyword.index + matchKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			messageQueuedKeyword.push(decoration);
		}
		activeEditor.setDecorations(messageQueuedKeywordDecorationType, messageQueuedKeyword);

		const sendRegExKeyWord = /(\bSend\b)|(\bpass\b)|(\bMatch Successfull\b)/g;
		const sendKeyWordText = activeEditor.document.getText();
		const sendKeyword: vscode.DecorationOptions[] = [];
		let matchSendKeyword;
		while (matchSendKeyword = sendRegExKeyWord.exec(sendKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchSendKeyword.index);
			const endPos = activeEditor.document.positionAt(matchSendKeyword.index + matchSendKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			sendKeyword.push(decoration);
		}
		activeEditor.setDecorations(greenDecorationType, sendKeyword);

		const receivedRegExKeyWord = /(\bReceived\b)/g;
		const receivedKeyWordText = activeEditor.document.getText();
		const receivedKeyword: vscode.DecorationOptions[] = [];
		let matchReceivedKeyword;
		while (matchReceivedKeyword = receivedRegExKeyWord.exec(receivedKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchReceivedKeyword.index);
			const endPos = activeEditor.document.positionAt(matchReceivedKeyword.index + matchReceivedKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			receivedKeyword.push(decoration);
		}
		activeEditor.setDecorations(yellowDecorationType, receivedKeyword);

		const statusRegExKeyWord = /(\bsetv\b|\bCONE\b|\bDOME\b|\bFLOW\b|\bMAPE\b|\bPARE\b|\bPATE\b|\bPLEX\b|\bPLOD\b|\bRNGE\b|\bSYSE\b|\bDIV0\b|\bTIME\b)/g;
		const statusKeyWordText = activeEditor.document.getText();
		const statusKeyword: vscode.DecorationOptions[] = [];
		let matchstatusKeyword;
		while (matchstatusKeyword = statusRegExKeyWord.exec(statusKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchstatusKeyword.index);
			const endPos = activeEditor.document.positionAt(matchstatusKeyword.index + matchstatusKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			statusKeyword.push(decoration);
		}
		activeEditor.setDecorations(statusDecorationType, statusKeyword);

		const reasonRegExKeyWord = /(\+\+\+\+\+\+\+\+\+\+\+\+\+REASON  BEGIN\+\+\+\+\+\+\+\+\+\+)|(\+\+\+\+\+\+\+\+\+\+\+\+\+REASON  END\+\+\+\+\+\+\+\+\+\+)/g;
		const reasonKeyWordText = activeEditor.document.getText();
		const reasonKeyword: vscode.DecorationOptions[] = [];
		let matchreasonKeyword;
		while (matchreasonKeyword = reasonRegExKeyWord.exec(reasonKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchreasonKeyword.index);
			const endPos = activeEditor.document.positionAt(matchreasonKeyword.index + matchreasonKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			reasonKeyword.push(decoration);
		}
		activeEditor.setDecorations(darkOrangeDecorationType, reasonKeyword);

		const finalVerdictRegExKeyWord = /((\b(End test case)\b)|(\b(Final Verdict)\:\b))/g;
		const finalVerdictKeyWordText = activeEditor.document.getText();
		const finalVerdictKeyword: vscode.DecorationOptions[] = [];
		let matchfinalVerdictKeyword;
		while (matchfinalVerdictKeyword = finalVerdictRegExKeyWord.exec(finalVerdictKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchfinalVerdictKeyword.index);
			const endPos = activeEditor.document.positionAt(matchfinalVerdictKeyword.index + matchfinalVerdictKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			finalVerdictKeyword.push(decoration);
		}
		activeEditor.setDecorations(finalVerdictDecorationType, finalVerdictKeyword);

		const commentRegExKeyWord = /(["'])(?:(?=(\\?))\2.)*?\1/g;
		const commentKeyWordText = activeEditor.document.getText();
		const commentKeyword: vscode.DecorationOptions[] = [];
		let matchcommentKeyword;
		while (matchcommentKeyword = commentRegExKeyWord.exec(commentKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchcommentKeyword.index);
			const endPos = activeEditor.document.positionAt(matchcommentKeyword.index + matchcommentKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			commentKeyword.push(decoration);
		}
		activeEditor.setDecorations(commentsDecorationType, commentKeyword);

		const failRegExKeyWord = /(\b(fail)\b)|(\b(Match Failed)\b)|(\b(Receive Failed)\b)/g;
		const failKeyWordText = activeEditor.document.getText();
		const failKeyword: vscode.DecorationOptions[] = [];
		let matchfailKeyword;
		while (matchfailKeyword = failRegExKeyWord.exec(failKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchfailKeyword.index);
			const endPos = activeEditor.document.positionAt(matchfailKeyword.index + matchfailKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			failKeyword.push(decoration);
		}
		activeEditor.setDecorations(redErrorDecorationType, failKeyword);

		const timestampRegExKeyWord = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]T[0-9][0-9][0-9][0-9][0-9][0-9].[0-9][0-9][0-9][0-9][0-9][0-9]/g;
		const timestampKeyWordText = activeEditor.document.getText();
		const timestampKeyword: vscode.DecorationOptions[] = [];
		let matchtimestampKeyword;
		while (matchtimestampKeyword = timestampRegExKeyWord.exec(timestampKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchtimestampKeyword.index);
			const endPos = activeEditor.document.positionAt(matchtimestampKeyword.index + matchtimestampKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			timestampKeyword.push(decoration);
		}
		activeEditor.setDecorations(timestampVerdictDecorationType, timestampKeyword);

		const expectedRegExKeyWord = /((\bExpected message\b)|(\bExpected\b))/g;
		const expectedKeyWordText = activeEditor.document.getText();
		const expectedKeyword: vscode.DecorationOptions[] = [];
		let matchexpectedKeyword;
		while (matchexpectedKeyword = expectedRegExKeyWord.exec(expectedKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchexpectedKeyword.index);
			const endPos = activeEditor.document.positionAt(matchexpectedKeyword.index + matchexpectedKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			expectedKeyword.push(decoration);
		}
		activeEditor.setDecorations(expectedDecorationType, expectedKeyword);

		// const expectedMessageRegExKeyWord = /(\b(Expected message)\b)/g;
		// const expectedMessageKeyWordText = activeEditor.document.getText();
		// const expectedMessageKeyword: vscode.DecorationOptions[] = [];
		// let matchexpectedMessageKeyword;
		// while (matchexpectedMessageKeyword = expectedMessageRegExKeyWord.exec(expectedMessageKeyWordText)) {
		// 	const startPos = activeEditor.document.positionAt(matchexpectedMessageKeyword.index);
		// 	const endPos = activeEditor.document.positionAt(matchexpectedMessageKeyword.index + matchexpectedMessageKeyword[0].length);
		// 	const decoration = { range: new vscode.Range(startPos, endPos) };
		// 	expectedMessageKeyword.push(decoration);
		// }
		// activeEditor.setDecorations(expectedDecorationType, expectedMessageKeyword);
	}

	function updateSelectedDecorations() {
		if (!activeEditor) {
			return;
		}

		const timestampRegExKeyWord = /(\d\d\:\d\d\:\d\d\.\d\d\d\d\d\d)/g;
		const timestampKeyWordText = activeEditor.document.getText();
		const timestampKeyword: vscode.DecorationOptions[] = [];
		let matchtimestampKeyword;
		while (matchtimestampKeyword = timestampRegExKeyWord.exec(timestampKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchtimestampKeyword.index);
			const endPos = activeEditor.document.positionAt(matchtimestampKeyword.index + matchtimestampKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			timestampKeyword.push(decoration);
		}
		activeEditor.setDecorations(timestampVerdictDecorationType, timestampKeyword);

		const commentRegExKeyWord = /(["'])(?:(?=(\\?))\2.)*?\1/g;
		const commentKeyWordText = activeEditor.document.getText();
		const commentKeyword: vscode.DecorationOptions[] = [];
		let matchcommentKeyword;
		while (matchcommentKeyword = commentRegExKeyWord.exec(commentKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchcommentKeyword.index);
			const endPos = activeEditor.document.positionAt(matchcommentKeyword.index + matchcommentKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			commentKeyword.push(decoration);
		}
		activeEditor.setDecorations(commentsDecorationType, commentKeyword);

		const debugRegExKeyWord = /(\b(debug)\b)/g;
		const debugKeyWordText = activeEditor.document.getText();
		const debugKeyword: vscode.DecorationOptions[] = [];
		let matchdebugKeyword;
		while (matchdebugKeyword = debugRegExKeyWord.exec(debugKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchdebugKeyword.index);
			const endPos = activeEditor.document.positionAt(matchdebugKeyword.index + matchdebugKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			debugKeyword.push(decoration);
		}
		activeEditor.setDecorations(debugDecorationType, debugKeyword);

		const infoRegExKeyWord = /(\b(info)\b)/g;
		const infoKeyWordText = activeEditor.document.getText();
		const infoKeyword: vscode.DecorationOptions[] = [];
		let matchinfoKeyword;
		while (matchinfoKeyword = infoRegExKeyWord.exec(infoKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchinfoKeyword.index);
			const endPos = activeEditor.document.positionAt(matchinfoKeyword.index + matchinfoKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			infoKeyword.push(decoration);
		}
		activeEditor.setDecorations(infoDecorationType, infoKeyword);

		const traceRegExKeyWord = /(\b(trace)\b)/g;
		const traceKeyWordText = activeEditor.document.getText();
		const traceKeyword: vscode.DecorationOptions[] = [];
		let matchtraceKeyword;
		while (matchtraceKeyword = traceRegExKeyWord.exec(traceKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchtraceKeyword.index);
			const endPos = activeEditor.document.positionAt(matchtraceKeyword.index + matchtraceKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			traceKeyword.push(decoration);
		}
		activeEditor.setDecorations(traceDecorationType, traceKeyword);

		const messageRegExKeyWord = /((\b(MESSAGE)\b)|(\b(PROTOBUF)\b))/g;
		const messageKeyWordText = activeEditor.document.getText();
		const messageKeyword: vscode.DecorationOptions[] = [];
		let matchmessageKeyword;
		while (matchmessageKeyword = messageRegExKeyWord.exec(messageKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchmessageKeyword.index);
			const endPos = activeEditor.document.positionAt(matchmessageKeyword.index + matchmessageKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			messageKeyword.push(decoration);
		}
		activeEditor.setDecorations(messageDecorationType, messageKeyword);

		const ipAddressRegExKeyWord = /(\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b)/g;
		const ipAddressKeyWordText = activeEditor.document.getText();
		const ipAddressKeyword: vscode.DecorationOptions[] = [];
		let matchipAddressKeyword;
		while (matchipAddressKeyword = ipAddressRegExKeyWord.exec(ipAddressKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchipAddressKeyword.index);
			const endPos = activeEditor.document.positionAt(matchipAddressKeyword.index + matchipAddressKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			ipAddressKeyword.push(decoration);
		}
		activeEditor.setDecorations(ipAddressDecorationType, ipAddressKeyword);
	}

	function triggerUpdateAllDecorations() {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}
		timeout = setTimeout(updateAllDecorations, 500);
	}

	function triggerUpdateSelectedDecorations() {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}
		timeout = setTimeout(updateSelectedDecorations, 490);
	}

	function getFileExtention(filePath: String)
	{
		var splittedFilePath = filePath.split("\\");
		var fileName = splittedFilePath[splittedFilePath.length - 1];
		var splittedFileName = fileName.split(".");

		if (splittedFileName.length === 2)
		{
			return splittedFileName[1];
		}
		else if (splittedFileName.length === 3)
		{
			var fileExt = splittedFileName[1] + "." + splittedFileName[2];
			return fileExt;
		}
	}

	if (activeEditor) {
		var fileExt = getFileExtention(activeEditor.document.fileName.toString());
		if (fileExt === "log" || fileExt === "k3.txt")
		{
			triggerUpdateAllDecorations();
		}
		else if (fileExt === "out")
		{
			triggerUpdateSelectedDecorations();
		}
	}

	vscode.window.onDidChangeActiveTextEditor(editor => {
		activeEditor = editor;
		if (editor) {
			var fileExt = getFileExtention(editor.document.fileName.toString());
			if (fileExt === "log" || fileExt === "k3.txt")
			{
				triggerUpdateAllDecorations();
			}
			else if (fileExt === "out")
			{
				triggerUpdateSelectedDecorations();
			}
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(event => {
		if (activeEditor && event.document === activeEditor.document ) {
			var fileExt = getFileExtention(event.document.fileName.toString());
			if (fileExt === "log" || fileExt === "k3.txt")
			{
				triggerUpdateAllDecorations();
			}
			else if (fileExt === "out")
			{
				triggerUpdateSelectedDecorations();
			}
		}
	}, null, context.subscriptions);

}

// this method is called when your extension is deactivated
export function deactivate() {}
