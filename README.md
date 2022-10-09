# アニマルマッチング アプリ
This is My first vue.js creation / 2022/09/25 ~ 

## ◆作品の概要
このアプリは, 譲渡に出されているペットたち(犬・猫)を閲覧できる機能とともに, 飼い主の性格とマッチした動物を提案するマッチング機能を実装しました。

## ◆制作動機(~未編集~)
犬猫の殺処分が問題となり, ペットショップからではなく, 飼い主から別の飼い主への譲渡という形でペットを飼う形態が変化してきた。そこで, 飼い主が理想のペットを探しやすくなるとともに, ペットとの性格マッチングによって, ペットも意志をもった存在であるということを自覚させることができるwebアプリを作ろうと思った。

## ◆機能一覧
診断 - 利用者の性格診断を行い, 性格の合うペットとマッチングします  
一覧 - 登録されているペットたちを一覧表示します。フィルタリング機能も追加しています  
追加 - 登録したいペットの登録情報を入力し, DBに保存します

## ◆Componentの概要
以下のサイトを参考に, 機能的なアプリを作るよう心掛けました。  

【Vue】単一ファイルコンポーネントの命名規則まとめ【ファイル名から記法まで】  
https://qiita.com/ngron/items/ab2a17ae483c95a2f15e  
【React/Vue.js】コンポーネント設計の（個人的）ベストプラクティス  
https://zenn.dev/offers/articles/20220523-component-design-best-practice 

### ●&ensp;Pages群
ページの表示を目的としたコンポーネントです

#### ・App.vue
&ensp;アプリの基本となる画面の構成を担います。一連の画面遷移による画面描写はこのApp.vue上で行われます

### ●&ensp;Views群
&ensp;後述するTemplates群のコンポーネントに対し, データを渡します。またデータは, API通信によりFirebase Cloud Firestoreから取得しています

#### ・AnimalList.vue
&ensp;動物たちのリストを表示するためのContainer(入れ物)としての役割です。  
&ensp;後述するAnimalListItem.vueとは, Container ⇔ View(親コンポーネントからのpropsのみで機能するコンポーネント)の関係です  

#### ・AnimalListAdd.vue
&ensp;登録したいペットの個体情報を入力します

#### ・ChartList.vue
&ensp;後述するChartList.vueとは, Container ⇔ Viewとの関係です。診断チャートを表示 & 診断結果を表示します

### ●&ensp;Templates群
&ensp;コンポーネントを組み合わせることを目的としたコンポーネントであり, ロジックを持ちます

#### ・AnimalListItem.vue
&ensp;親コンポーネントであるAnimalList.vueから動物たちのリストを受け取り, それらを表示します。

#### ・AnimalListDetail.vue
&ensp;AnimalListItem.vueのリストがクリックされた際に, そのリストの詳細を表示します

#### ・ChartListItem.vue
&ensp;診断チャートの各問を表示します。動的に...

### ●&ensp;Parts群
&ensp;最小粒度のコンポーネントで, UIとしての機能を持ち, ロジックを有しません

 - btn-primary
