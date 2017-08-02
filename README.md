# myxQuizHex

## 概要
2017年8月19日開催のクイズ大会「STU XVIII」で行う団体戦用の得点表示プログラムです。

## インストール・起動方法
### パッケージを利用する場合
1. 右記のファイルをダウンロードする。
    [myxQuizHex-win32-x64.zip](https://drive.google.com/open?id=0B00MyT_-RKCUVWk4SUxlMWlXYzA)
1. ダウンロードしたファイルを適当な場所に展開する。
1. 'myxQuiz.exe'を実行する。

### リポジトリを利用する場合
1. Node.jsのインストール、及び Electron ver.1.4.1 の開発環境を導入する。
1. 右記のディレクトリをcloneする。[miyax0227/myxQuizHex](https://github.com/miyax0227/myxQuizHex)
1. リポジトリの最上位ディレクトリに移動する。
1. 不足しているディレクトリ（`/current/history`, `/twitter/backup`)を作成するため、下記コマンドを実行する。  
     ファイルロックによりエラーが発生する場合は、エラーが発生しなくなるまで繰り返す。
    ```Shell
    node clean.js
    ```
1. Electronコマンドによりmain.jsを読み込む。
    ```Shell
    electron .
    ```

## 使い方
### メニューウィンドウ
![Menu Window Usage](http://drive.google.com/uc?export=view&id=0B00MyT_-RKCUYlEzTzJORHZURE0)
1.  **招集(全体)**   
     **最初に実施する。** Excel形式のエントリーリストを読み込む。ファイルを選択するとウィンドウ下部にプレビューが表示され、OKボタン押下により読み込みが完了する。
1.  **招集(個別)**  
    **各ラウンドの実行前に実施する。** エントリーリストまたは前ラウンドの結果から各ラウンドに参加する人を読み込む。画面下部にプレビューが表示される。OKボタン押下により読み込みが完了する。
1. **ラウンド開始**  
    **各ラウンドを開始する。** 各ラウンドの操作ウィンドウが開く。以前に開いて中断したラウンドの場合は、中断した時点の履歴から再開する。
1. 初期化(全体)  
    読み込み状態を初期化する。1. 招集(全体)を行う前の状態に戻る。
1. 初期化(個別)  
    各ラウンドの状態を初期化する。3. ラウンド開始を行う前の状態に戻る。
1. Twitter  
    Twitterウィンドウを開く。
1. フォルダ  
    インストールしたフォルダを開く。
        
### 操作ウィンドウ
#### 全ラウンド共通
#### 予選
#### 準決勝・決勝
### Twitterウィンドウ

## カスタマイズ方法
### ウィンドウの表示位置・サイズの変更
### 連携先Twitterアカウントの変更
### Excelファイル読み込み時の対象ワークシートの変更

## 作成者
Ryoh MIYAMOTO (Miyax)  
[Github](https://github.com/miyax0227)  
[Twitter](https://twitter.com/mi_yax)  

