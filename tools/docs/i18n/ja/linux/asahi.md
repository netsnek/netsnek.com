---
title: Asahi デスクトップのセットアップ
description: MacBook Pro の上に Wayfire と XFCE で Wayland デスクトップをどう組み上げたか、そして道中で私を捕まえたつまずきの石について。
path: /docs/linux/asahi
---

# Asahi デスクトップのセットアップ

私のデスクトップは、既製品としてはどこにも存在しない組み合わせです。Wayland コンポジターとして Wayfire、その上にデスクトップ環境として XFCE 4.20、そして全体は Asahi カーネルを載せた Fedora 43 の MacBook Pro 上で動きます。Apple GPU は Mesa 経由です。私は Wayfire のコンポジティング効果が欲しく、それでいてパネルや Thunar や設定ダイアログのある慣れ親しんだ XFCE の世界も手放したくありませんでした。この2つは一緒に機能します。ただ、すべての部品がきれいに噛み合うまでには時間がかかりました。その道のりがこのページの内容です。

## スタックの概観

```
greetd + tuigreet
  └→ startxfce4 --wayland wayfire
       ├→ Wayfire (Wayland-Compositor, wlroots-basiert)
       ├→ xfce4-session
       ├→ xfce4-panel (gepatcht: gtk-layer-shell)
       ├→ xfdesktop (gepatcht: Wayland-Monitornamen)
       └→ nm-applet, swayidle
```

役割分担はこうです。Wayfire がコンポジティング、ウィンドウ管理、エフェクトを担当します。XFCE がセッション管理、パネル、デスクトップ、設定、そしてアプリケーションを提供します。その際 XFCE は Wayland セッションとして Wayfire の上で直接起動します。

## ログイン: greetd + tuigreet

重いディスプレイマネージャーは使いたくありませんでした。テキストベースのグリーター tuigreet と組み合わせた greetd は最小限で高速、しかも独自のグラフィックセッションを必要としません。`/etc/greetd/config.toml` にある私の設定です。

```toml
[terminal]
vt = 7

[default_session]
command = "tuigreet --time --remember --cmd 'startxfce4 --wayland wayfire'"
user = "greetd"
```

## Wayfire

Wayfire は `~/.config/wayfire.ini` で設定しています。そこで下した最も重要な判断は次のとおりです。

- `preferred_decoration_mode = server` により、すべてのウィンドウがサーバーサイドデコレーションになります。どのアプリもコンポジターから同じタイトルバーを受け取ります。そのアプリが何を持ち込もうと関係ありません。この統一された見た目が私には重要でした。
- Retina ディスプレイの HiDPI 用に `scale = 2.0`。
- 4x1 の並びの仮想ワークスペース（`vwidth = 4`、`vheight = 1`）。キーボードとジェスチャーで移動できます。
- expo（ワークスペース概観）、grid、cube、wobbly といったプラグイン。Compiz 時代から恋しかった、あのコンポジティングの心地よさのためです。

いちばんのお気に入りはデスクトップキューブです。4x1 のワークスペースは回転するキューブの側面に並び、Super キー＋クリックか4本指スワイプで開きます。どちらも独自のパッチ由来で、[rpm.netsnek.com](/docs/linux/rpm) のパッチ済み Wayfire が持ち込んでいるものです。そしてできてしまうので、`cube-gears` プラグインが glxgears をもじった回転する歯車をキューブの内側に描きます。Apple GPU のスタック上で、これらすべてが滑らかに動きます。

スクリーンショットは grim と slurp で撮り、編集は swappy でします。ランチャーには wofi、ターミナルには kitty を使っています。

## Wayland セッションとしての XFCE

XFCE 4.20 は、外部のコンポジター上で Wayland セッションとして動作できます。ここで `startxfce4 --wayland wayfire` によって起きているのが、まさにそれです。2つの細部に時間を取られました。

**環境変数は `~/.config/xfce4/xinitrc` に置く。** greetd はログインシェルのプロファイルを読み込みません。`GTK_MODULES=xfsettingsd-gtk-settings-sync` のような変数を設定したい人は、xinitrc でやる必要があります。この変数のおかげで、XFCE の設定ダイアログは独自の GtkHeaderBar ではなく Wayfire のサーバーサイドデコレーションを使います。

**`dbus-update-activation-environment --systemd` は `WAYLAND_DISPLAY` と `DISPLAY` を含まなければならない。** これを systemd のユーザーセッションに引き渡さないと、`xdg-desktop-portal-gtk` が失敗します。私がそれに気づいたのは、Wayland アプリケーションのファイルダイアログが壊れていたからです。たとえば Chromium での保存時に。

いちばん長く格闘したのはワークスペースページャーです。wlroots 0.19 は `ext_workspace_manager_v1` プロトコルを実装しておらず、ネイティブ対応は wlroots 0.20 でようやく来ます。そのため標準パッケージのままだと XFCE にはワークスペースが1つしか見えず、私の美しい 4x1 のキューブはパネルからは不可視でした。私の解決策はこうです。ext-workspace-v1 の実装をバックポートしたパッチ済み wlroots 0.19.2、それに Wayfire のワークスペースをこのプロトコル経由で公開するプラグイン `wlr-workspaces` を載せた Wayfire 0.10.1。どちらのパッケージも私の [RPM リポジトリ](/docs/linux/rpm)から来ています。これで XFCE のページャーはボタンモードですべてのワークスペースを表示し、ページャー内のクリックでワークスペースが切り替わります。そのためにはパネルが少なくともバージョン 4.20.1 である必要があります。4.20.0 には ext-workspace のバグが含まれています。依然として欠けているものもあります。このプロトコルはウィンドウとワークスペースの対応付けを知らないため、サムネイル型ページャーもワークスペースごとの壁紙もありません。

## オーディオ: PipeWire

オーディオは PipeWire 1.4 と WirePlumber 0.5 で動いています。`pipewire-pulseaudio` パッケージが古いアプリケーション向けの PulseAudio 互換を、`pipewire-jack-audio-connection-kit` が JACK インターフェースを提供します。`pulseaudio-utils` がおなじみの `pactl` を持ってきます。

## Bluetooth: 安定した A2DP

Asahi 上の Bluetooth オーディオが完成した製品のように感じられるまでに、私は2つの戦いを強いられました。

### HFP 自動切り替えを止める

第一の戦い。音楽は素晴らしく鳴っている、そこへどれかのアプリがヘッドセットマイクを要求し、突然、電話品質のモノラル音声とノイズが聞こえてくる。犯人は HFP/HSP プロファイルへの自動切り替えです。`~/.config/wireplumber/wireplumber.conf.d/51-bluez-no-autoswitch.conf` に置いた私の WirePlumber ドロップインファイルが、純粋な音楽運用を強制します。

```
wireplumber.settings = {
  bluetooth.autoswitch-to-headset-profile = false
}

monitor.bluez.properties = {
  bluez5.roles = [ a2dp_sink a2dp_source ]
  bluez5.codecs = [ aac aptx_hd aptx ldac sbc_xq sbc ]
  bluez5.enable-msbc = false
  bluez5.enable-hw-volume = true
}
```

代償として、Bluetooth マイクは使えなくなります。通話には MacBook 内蔵のマイクを使いますが、そもそもそちらのほうが良い音です。ヘッドセットマイクが必要な人は `autoswitch-to-headset-profile = true` にして、`bluez5.roles` の行を削除してください。

### 無線LANトラフィック時の A2DP 途切れ

第二の戦いはもっと分かりにくいものでした。Bluetooth オーディオが、決まって無線LANが動いているときだけプチプチと鳴るのです。Apple Silicon Mac の Broadcom チップは、無線LANと Bluetooth で1本のアンテナを共有しています。macOS はベンダー固有の HCI コマンドで A2DP 接続を優先しますが、Linux ドライバーはそれをしません。解決策は小さな systemd サービスで、Bluetooth の接続のたびにトラフィックの優先度を HCI コマンドで引き上げます。このアプローチは [asahi-bt-a2dp-fix](https://github.com/christian-korneck/asahi-bt-a2dp-fix) プロジェクトから来ています。

### 初回ペアリング

ヘッドセットによっては、最初のペアリング時に HFP でしか接続せず、A2DP プロファイルがまったく現れないことがあります。私の環境で効くのは、切断と再接続の間にオーディオ関連サービスを再起動することです。

```bash
bluetoothctl disconnect <MAC>
systemctl --user restart wireplumber pipewire-pulse pipewire
bluetoothctl connect <MAC>
```

そのあとは、再接続をまたいでも A2DP プロファイルが保たれます。

## HiDPI とノッチ

内蔵ディスプレイは Wayfire で `scale = 2.0` にして動かしています。MacBook Pro のノッチは既定で隠されています。ディスプレイ面積をすべて使いたい人は、カーネルパラメーター `appledrm.show_notch=1` で有効にします。この変更には再起動が必要です。

## つまずきの石

### 16Kメモリページ

私の最初の本物の Asahi 体験は、起動した途端に消える Minecraft でした。Asahi カーネルは通常の 4K ではなく 16K ページを使います。ほとんどのソフトウェアはそれに備えていますが、4K 前提を固定でコンパイルし込んだプログラムはクラッシュします。いちばんよくある犯人は同梱された jemalloc で、`<jemalloc>: Unsupported system page size` というメッセージで見分けられます。私自身が通り抜けた3つのケースを挙げます。

- **Minecraft**: LWJGL に同梱された jemalloc は起動時に確実にクラッシュします。修正は JVM フラグ `-Dorg.lwjgl.system.allocator=system` で、これにより LWJGL は glibc のアロケーターを使います。最近の Mod ローダーでは、加えてインスタンスの Java を Java 21 に固定します。
- **Widevine**: ARM64 の CDM は 16K ページ向けにパッチを当てる必要があります。Asahi の `widevine-installer` がインストール時に自動でやってくれます。
- **FEX-emu**: この x86 エミュレーターは、16K カーネル上で同じ jemalloc 問題によって死にます。だから私の環境では x86 ソフトウェアは microVM の中で動いています。下記を参照してください。

Asahi 上で何かが何も言わずにクラッシュしたら、私が最初に疑うのはもうページサイズです。

### GTK4 が Vulkan レンダラーでクラッシュする

私の環境では、GTK4 アプリケーションが何も言わず SIGSEGV で消え、使えるトレースバックも残りませんでした。原因はこうです。新しめの GTK4 バージョンは、Vulkan ドライバーがインストールされているとすぐに Vulkan レンダラーを選びます。Asahi の Vulkan ドライバー Honeykrisp は、この経路をまだ安定して支えていません。私の回避策は GL レンダラーを強制するもので、すべての GTK4 アプリに当てはまります。

```bash
GSK_RENDERER=gl <app>
```

これを恒久的にしたい人は、この変数を `~/.config/xfce4/xinitrc` に設定して、セッション全体に継承させます。Flatpak についてはアプリごとに設定します。

```bash
flatpak override --user --env=GSK_RENDERER=gl <app-id>
```

確認のために、私はアプリを `GSK_DEBUG=renderer` 付きで起動します。ログに `Using renderer 'GskGLRenderer'` と出ていなければなりません。GL レンダラーでも問題が出るなら、`GSK_RENDERER=cairo` が純粋なソフトウェア経路です。常に安定していますが、遅くなります。

### Signal Desktop には --no-sandbox が必要

Signal Desktop は ARM64 の Fedora では `--no-sandbox` フラグを必要とし、これがないと起動しません。

### サスペンドは s2idle のみ

Apple Silicon は Linux 上では s2idle にしか対応していません。ハイバネートは GPU ファームウェアの制約により不可能です。これについては私はもう受け入れました。

### USB-C ポートに繋いだ USB 1.1 機器

6.19 より前の Asahi カーネルでは、古いアダプターやマイコンボードのようなフルスピード機器がしばしば列挙されず、カーネルログには `device descriptor read/64, error -71` のようなメッセージが出ます。原因は USB2 の PHY 処理にあり、Linux 6.19 以降で修正済みです。経験からの警告を1つ。PHY をリセットするために `dwc3-apple` ドライバーを稼働中にアンバインドするのは、絶対にやめてください。コントローラーが固まり、両方の USB バスが再起動まで消えます。

## FEX と muvm による x86 ソフトウェア

ソフトウェアによっては ARM64 Linux 向けのビルドがそもそも存在しません。私の場合、TeamSpeak クライアントがそういうケースです。それでも Asahi 上では動きます。x86_64 エミュレーターの FEX-emu を使うのです。FEX 自身が 16K カーネルで躓くため、エミュレーションは muvm、つまり 4K ページのゲストを持つ軽量な microVM の中に入っています。必要なパッケージは `fex-emu`、`muvm`、`fex-emu-rootfs-fedora` という名前です。ゲスト内の binfmt エントリーが x86 バイナリを自動的に FEX 経由に振り分けます。

一つひとつ自分で掘り当てるはめになった癖をいくつか挙げます。

- ゲストからは X11 が見えていて、Wayland ソケットは見えません。muvm は `DISPLAY` をホストの Xwayland への X11 ブリッジに設定します。そのため Chromium 系や CEF のアプリには `--ozone-platform=x11` が、Qt アプリには `QT_QPA_PLATFORM=xcb` が必要です。
- オーディオは何もしなくても動きます。muvm が PipeWire と Pulse をゲストに通してくれます。
- HOME ディレクトリは virtiofs で共有されます。足りない x86 ライブラリは `dnf download --forcearch=x86_64 <paket>` で取ってきて、HOME 以下に展開し、`LD_LIBRARY_PATH` で組み込みます。
- Chromium 系や CEF のアプリには `--no-sandbox` が必要です。それらのサンドボックスが FEX 下では初期化されないからです。Qt WebEngine では同様に `QTWEBENGINE_DISABLE_SANDBOX=1` が当てはまります。
- ゲスト内での GPU アクセラレーションには `mesa-fex-emu-overlay-x86_64` パッケージと、Asahi の COPR にある virglrenderer ビルドが必要です。注意点として、Fedora 純正の virglrenderer がアップデート時に COPR パッケージを黙って置き換えてしまうことがあり、そうなるとゲスト内の GPU アクセラレーションは消えます。`dnf versionlock add virglrenderer` がそれを防ぎます。
- muvm が理由も分からず起動しなくなったときは、以前のクラッシュした実行が残した孤児ファイル（`krun`、`muvm.lock`）が XDG ランタイムディレクトリにあることが多いです。muvm のプロセスがもう1つも動いていないことを確かめてから削除してください。

## パッチ済みパッケージ

このセットアップのいくつかの構成要素は、Fedora にはそのままの形では存在しないパッチを必要とします。パネルはレイヤーシェルの面として動かなければならず、xfdesktop には Wayland のモニター名の修正が要り、ロックスクリーンには `ext-session-lock-v1` が要り、ワークスペースページャーにはパッチ済みの wlroots と Wayfire プラグインが要ります。これらのパッケージは自分でビルドしています。その全容は [Netsnek RPM リポジトリ](/docs/linux/rpm)にあります。
