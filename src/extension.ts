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

	const expectedDecorationType = vscode.window.createTextEditorDecorationType({
		backgroundColor: { id: 'logslighter.light_green' }
	});
	

	let activeEditor = vscode.window.activeTextEditor;

	function updateDecorations() {
		if (!activeEditor) {
			return;
		}
		const messageQueuedRegExKeyWord = /Message Queued/g;
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

		const sendRegExKeyWord = /\b(Send)|\b(pass)|(Match Successfull)/g;
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

		const receivedRegExKeyWord = /\sReceived/g;
		const receivedKeyWordText = activeEditor.document.getText();
		const receivedKeyword: vscode.DecorationOptions[] = [];
		let matchReceivedKeyword;
		while (matchReceivedKeyword = receivedRegExKeyWord.exec(receivedKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchReceivedKeyword.index + 1);
			const endPos = activeEditor.document.positionAt(matchReceivedKeyword.index + matchReceivedKeyword[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			receivedKeyword.push(decoration);			
		}
		activeEditor.setDecorations(yellowDecorationType, receivedKeyword);
		
		const errorRegExKeyWord = /((\|setv\|)|(\|CONE\|)|(\|DOME\|)|(\|FLOW\|)|(\|MAPE\|)|(\|PARE\|)|(\|PATE\|)|(\|PLEX\|)|(\|PLOD\|)|(\|RNGE\|)|(\|SYSE\|)|(\|DIV0\|)|(\|TIME\|))/g;
		const errorKeyWordText = activeEditor.document.getText();
		const errorKeyword: vscode.DecorationOptions[] = [];
		let matchedErrorKeyword;
		while (matchedErrorKeyword = errorRegExKeyWord.exec(errorKeyWordText)) {
			const startPos = activeEditor.document.positionAt(matchedErrorKeyword.index + 1);
			const endPos = activeEditor.document.positionAt(matchedErrorKeyword.index + matchedErrorKeyword[0].length - 1);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			errorKeyword.push(decoration);			
		}
		activeEditor.setDecorations(redErrorDecorationType, errorKeyword);

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

		const finalVerdictRegExKeyWord = /((End test case)|(Final Verdict\:))/g;
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
		
		const failRegExKeyWord = /(\bfail)|(\bMatch Failed)/g;
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

		const expectedRegExKeyWord = /\bExpected/g;
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

	}

	function triggerUpdateDecorations() {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}
		timeout = setTimeout(updateDecorations, 500);
	}

	if (activeEditor) {
		triggerUpdateDecorations();
	}

	vscode.window.onDidChangeActiveTextEditor(editor => {
		activeEditor = editor;
		if (editor) {
			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(event => {
		if (activeEditor && event.document === activeEditor.document) {
			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);

}

// this method is called when your extension is deactivated
export function deactivate() {}
