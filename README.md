# animalChart
My first vue creation / 2022/09/25

### ○各View, Componentの概要
以下のサイトを参考に, 機能的なアプリを作るよう心掛けました。
https://aloerina01.github.io/blog/2018-05-01-1

#### ・App.vue
アプリの基本となる画面の構成を担います。一連の画面遷移による画面描写はApp.vue上で行われます。

#### ・AnimalList.vue
動物たちのリストを表示するためのContainer(入れ物)としての役割です。後述するListItem.vueとは, Container ⇔ View(ステートレスで受け取ったpropsのみで機能する)の関係です。  
App.vueからroute.paramsを受け取った場合, お気に入り登録されている動物のリストをListItem.vueに渡します。

#### ・ListItem.vue
親コンポーネントであるAnimalList.vueから動物たちのリストを受け取り, それらを表示します。
