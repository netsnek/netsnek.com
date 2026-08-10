---
title: Apple Silicon 上の Linux
description: なぜ私は MacBook Pro を Fedora Asahi で動かしているのか、私のデスクトップがどのようにできあがったのか、そして何のために自前の RPM リポジトリを運営しているのか。
path: /docs/linux
---

# Apple Silicon 上の Linux

私のメインマシンは Apple Silicon 搭載の MacBook Pro です。その上で動いているのは macOS ではなく、Asahi Linux のパッチを当てた Fedora 43 です。インストールは Fedora Minimal から、つまり初回起動後にはほとんど何もできないシステムから始めました。そのあとに来たものはすべて、私が一つひとつ自分で組み上げたものです。これらのページは、このセットアップがどうなっているか、なぜそうなっているか、そして途中でどこにつまずいたかを語ります。

## そもそもなぜ MacBook に Linux なのか

理由はハードウェアです。Apple Silicon の MacBook はきわめて低い消費電力で高い性能を出し、Asahi プロジェクトはまさにこれらのデバイスに Linux をもたらします。Mesa 経由の Apple GPU に対するグラフィックアクセラレーションも含めてです。これにより、本格的な Wayland デスクトップが aarch64 上でネイティブに動きます。私にとってこれは、これまでで最良の Linux マシンです。

問題点もあります。公式の Fedora リポジトリにあるいくつかのパッケージは、このセットアップのために手を加える必要があります。そもそも aarch64 版が存在しないソフトウェアもあります。まさにこの隙間を、私は自前のパッチと自前の RPM リポジトリで埋めています。

## ここに書いてあること

### [Asahi デスクトップのセットアップ](/docs/linux/asahi)

私のデスクトップスタック一式です。Wayland コンポジターとしての Wayfire、Wayland セッションで動くデスクトップ環境としての XFCE、ログインには greetd と tuigreet、オーディオには PipeWire、そしてついにノイズの乗らなくなった Bluetooth 運用。さらに、Asahi で私を捕まえたつまずきの石も。たとえばカーネルの16Kメモリページ（私の Minecraft はこれで砕け散りました）、クラッシュする GTK4 アプリの回避策、そして FEX と muvm を通じた x86 ソフトウェアへの道です。

### [Netsnek RPM リポジトリ](/docs/linux/rpm)

`rpm.netsnek.com` には、このセットアップを可能にしているパッチ済みパッケージが置いてあります。このページは、どのパッケージになぜパッチを当てているかを語ります。wlroots にバックポートした Workspace プロトコルから、パネルとデスクトップのための Wayland 修正まで。

## これは誰のためのものか

Apple Silicon デバイス上で似たようなセットアップを組み上げたいすべての人のためです。Fedora とコマンドラインの基礎知識は前提とします。すべての例は aarch64 上の Fedora 43 を対象としています。
