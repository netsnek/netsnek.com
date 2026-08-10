---
title: qtamp をインストールする
description: Linux と macOS ではコマンド1つ、ブラウザーではゼロ。インストーラー qtamp.sh で qtamp をマシンに入れる方法。
path: /docs/qtamp/install
---

# qtamp をインストールする

いちばん簡単な方法は、インストールをまったく必要としません。[qtamp.org](https://qtamp.org) では、本物のプレイヤーが WebAssembly ビルドとしてブラウザー上で直接動きます（Chromium 系のブラウザーで）。ちょっと試してみるだけなら、これで十分です。

デスクトップ向けには、私自身が欲しいと思うとおりのインストーラーを作りました。Linux でも macOS でも、コマンド1つです。

```sh
curl https://qtamp.sh | sh
```

スクリプトは OS を判別し、必要な依存関係をパッケージマネージャー経由で取得し、qtamp をソースコードからビルドします。`sudo` を求めるのは、パッケージのインストールと最後のインストール手順のときだけです。これから何が起きるのかを先に読んでおきたい人はこちら。

```sh
curl -fsSL https://qtamp.sh | less
```

他者のオリジナルソースは同梱もしませんし、再配布もしません。ビルドのために必要な人は、自分で入手し、自分に適用されるライセンス条件を確認してください。

## Linux

対応しているのは Fedora、Debian と Ubuntu、Arch、そして openSUSE です。aarch64 上の Asahi Linux は Fedora の経路で動き、私にとって特に思い入れがあります。私の日常のプラットフォームだからです。ビルド後は `qtamp` でプレイヤーが起動します。試してみるためのスキンは、MIT ライセンスのショーケース用フォークとして [github.com/qtamp](https://github.com/qtamp) にあります。インストーラーをもう一度実行すれば、既存のインストールがそのまま更新されます。

## macOS

Apple Silicon 上では qtamp はネイティブに動き、同じコマンドが通用します。インストーラーは必要に応じて Homebrew でビルドツールを整え、最後に独立した `qtamp.app` をバンドルします。これは `/Applications` に置かれ、他のアプリと同じように Spotlight から起動できます。

## ブラウザービルドを自分でビルドする

WebAssembly ビルドを自分で生成したい人は `--wasm` を付け足します。この経路には Docker が必要です。

```sh
curl https://qtamp.sh | sh -s -- --wasm
```

結果はデプロイ可能なプレイヤーとして `build-wasm/dist` に置かれます。

## ソースコードから手動で

インストーラーが気に入らない人は、手作業でビルドします。

```sh
git clone --recursive https://github.com/qtamp/qtamp && cd qtamp && deps/qtWasabi/scripts/fetch-wasabi.sh && cmake -B build -DQTAMP_USE_QTWASABI=ON && cmake --build build
```

重要なのは `--recursive` です。これがないと、サブモジュールである qtWasabi エンジンが欠けます。

## Windows

Windows は計画中ですが、まだありません。エンジンはプラットフォーム固有の小細工のない純粋な Qt6 と C++ なので、移植はビルドインフラの問題です。私のフォーカスは、まずスキンの忠実さにあります。

## うまくいかないとき

質問やバグ報告は Issue トラッカーへどうぞ: [github.com/qtamp/qtamp/issues](https://github.com/qtamp/qtamp/issues)
