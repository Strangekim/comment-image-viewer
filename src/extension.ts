import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  console.log('🔥 Comment Image Viewer Activated');
  const imageDecorationType = vscode.window.createTextEditorDecorationType({});

  function updateDecorations(editor: vscode.TextEditor) {
    if (!editor) return;

    const text = editor.document.getText();
    const lines = text.split('\n');
    const decorations: vscode.DecorationOptions[] = [];

    const regex = /^\/\/\s*@img\s+(.+?)\s+(\d{1,3})%$/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(regex);
      if (!match) continue;

      const [_, relPath, scaleStr] = match;
      const scale = parseInt(scaleStr);
      if (isNaN(scale) || scale < 1 || scale > 100) continue;

      const imagePath = path.resolve(path.dirname(editor.document.uri.fsPath), relPath);

      const decoration: vscode.DecorationOptions = {
        range: new vscode.Range(i + 1, 0, i + 1, 0), // 이미지 아래 줄에 표시
        renderOptions: {
          after: {
            contentIconPath: vscode.Uri.file(imagePath),
            margin: '0',
            textDecoration: `
              ;display:block;
              transform: scale(${scale / 100});
              transform-origin: top left;
            `
          }
        }
      };

      decorations.push(decoration);
    }

    editor.setDecorations(imageDecorationType, decorations);
  }

  function triggerUpdateDecorations(editor: vscode.TextEditor) {
    if (editor && editor.document.languageId === 'javascript') {
      updateDecorations(editor);
    }
  }

  vscode.window.onDidChangeActiveTextEditor(
    editor => triggerUpdateDecorations(editor!),
    null,
    context.subscriptions
  );

  vscode.workspace.onDidChangeTextDocument(
    event => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || event.document !== editor.document) return;
      updateDecorations(editor);
    },
    null,
    context.subscriptions
  );

  if (vscode.window.activeTextEditor) {
    triggerUpdateDecorations(vscode.window.activeTextEditor);
  }
}

export function deactivate() {}
