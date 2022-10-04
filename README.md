# animalChart
This is My first vue creation / 2022/09/25 ~ 

### ◆作品の概要
このアプリは, 譲渡に出されているペットたち(犬・猫)を閲覧できる機能とともに, 飼い主の性格とマッチした動物を提案する診断機能を実装しました。
### ◆作ることになった動機(~未編集~)
犬猫の殺処分が問題となり, ペットショップからではなく, 飼い主から別の飼い主への譲渡という形でペットを飼う形態が変化してきた。そこで, 飼い主が理想のペットを探しやすくなるとともに, ペットとの性格マッチングによって, ペットは意志をもった存在であるということを自覚させることができるwebアプリを作ろうと思った。

### ◆各View, Componentの概要
以下のサイトを参考に, 機能的なアプリを作るよう心掛けました。  

【Vue】単一ファイルコンポーネントの命名規則まとめ【ファイル名から記法まで】  
https://qiita.com/ngron/items/ab2a17ae483c95a2f15e  
【React/Vue.js】コンポーネント設計の（個人的）ベストプラクティス  
https://zenn.dev/offers/articles/20220523-component-design-best-practice   

#### ○App.vue
&ensp;アプリの基本となる画面の構成を担います。一連の画面遷移による画面描写はApp.vue上で行われます

#### ○AnimalList.vue
&ensp;動物たちのリストを表示するためのContainer(入れ物)としての役割です。  
&ensp;後述するListItem.vueとは, Container ⇔ View(ステートレスで受け取ったpropsのみで機能する)の関係です  
 \- App.vueからroute.paramsを受け取った場合, お気に入り登録されている動物のリストをListItem.vueに渡します

#### ○AnimalListItem.vue
&ensp;親コンポーネントであるAnimalList.vueから動物たちのリストを受け取り, それらを表示します。

#### ○AnimalListDetail.vue
&ensp;AnimalListItem.vueのリストがクリックされた際に, そのリストの詳細を表示します

#### ○ChartList.vue
&ensp;後述するChartList.vueとは, Container ⇔ Viewとの関係です。診断チャートを表示 & 診断結果を表示します

#### ○ChartListItem.vue
&ensp;診断チャートの各問を表示します。動的に...

#### ◆各parts(最小粒度のコンポーネント)の概要
 - btn-primary
