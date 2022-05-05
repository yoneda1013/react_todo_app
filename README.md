# アプリ名：入稿時チェックアプリ

## 説明
新人デザイナーや、普段紙ものを扱うことが少ないデザイナー向けに、入稿時の注意点をメモし、管理できるアプリを作成しました。<br>
入稿時のデータ形式をメモできると同時に、入稿前のチェックも一緒にできるようにformの画面を工夫しました。

## 使い方
![入力画面](https://user-images.githubusercontent.com/90192979/166429382-c0bab6e5-e23a-4bcd-a9eb-c3fdbbbb67ef.png)
<br>タイトル部分に案件名を入れ、チェックリスト内のinputには案件、予定している印刷所ごとのデータ形式を入力します。
入稿前にはcheckboxにチェックを入れることで、データ形式など入稿時のチェック漏れを防ぎます。
<br><br>一覧からプロジェクトのリストも確認ができ、削除もこの画面で行います。
![一覧](https://user-images.githubusercontent.com/90192979/166439002-e314cbf3-8308-45a7-804e-bf90e7ee5b13.png)
<br><br>ログイン、新規登録を行うことも可能です。
![ログイン画面](https://user-images.githubusercontent.com/90192979/166876008-de2cf2d0-f3a3-4ac1-915b-0dc553ef8716.png)
## 機能
・ログイン、新規登録機能<br>
・firebaseにデータを保存、またそのデータを変更、削除<br>
・firebaseのクエリを使用したページネーション<br>
・ゲストログイン機能<br>

## 構築、インストール方法
・インストール方法<br>
React ```npx create-react-app my-app cd my-app```<br>
Firebase ```npm install -g firebase-tools```<br>
<br><br>
・構築
ローカル環境での閲覧
```npm start```
→ Open http://localhost:3000

オープンな環境に構築する場合
```firebase init```
```firebase login```
```npm run build```
```npm firebase deploy```

## ライセンス
MIT 

## 作者
YONEDA MANAE
<br>
<br>
