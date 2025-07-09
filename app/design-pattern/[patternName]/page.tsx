"use client";

import React, { useState, useEffect } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import CodeBlock from "@/components/CodeBlock";
import Mermaid from "@/components/Mermaid";

interface PatternPageProps {
  params: Promise<{
    patternName: string;
  }>;
}

interface PatternDetails {
  name: string;
  inANutshell: string;
  purpose: string;
  analogy: string;
  structure: string;
  pros: string;
  cons: string;
  uml: string;
  code: {
    typescript: string;
    python: string;
  };
}

const patternMap: { [key: string]: PatternDetails } = {
  singleton: {
    name: "Singleton",
    inANutshell:
      "あるクラスのインスタンスがプログラム全体で1つしか存在しないことを保証するデザインパターン。",
    purpose:
      "データベース接続や設定ファイルなど、アプリケーション全体で共有されるべきリソースへのアクセスを単一の窓口に限定するために使用されます。",
    analogy:
      "学校に校長先生が一人しかいない状況に例えられます。誰が校長先生を呼んでも、必ず同じ一人の校長先生が対応します。",
    structure:
      "クラス自身が唯一のインスタンスを保持し、それを取得するための静的メソッド（`getInstance`など）を提供します。コンストラクタは外部から呼び出せないように `private` にします。",
    pros: "インスタンスが1つであることを保証できる。グローバル変数のようにどこからでもアクセスできる。",
    cons: "単体テストが難しくなる場合がある。依存関係が隠蔽されやすい。",
    uml: `
      classDiagram
        class Singleton {
          -static instance: Singleton
          -Singleton()
          +static getInstance(): Singleton
        }
    `,
    code: {
      typescript: "/codes/design-pattern/creational/singleton.ts",
      python: "/codes/design-pattern/creational/singleton.py",
    },
  },
  "factory-method": {
    name: "Factory Method",
    inANutshell: "オブジェクトの生成処理をサブクラスに任せるデザインパターン。",
    purpose:
      "どのクラスのインスタンスを生成するかをサブクラスに決定させることで、クラスの拡張性を高めます。フレームワークやライブラリでよく利用されます。",
    analogy:
      "ピザ屋の注文に例えられます。「ピザを注文する」というインターフェースは決まっていますが、実際にどのピザ（マルゲリータ、シーフードなど）を作るかは、各店舗（サブクラス）の裁量に任されています。",
    structure:
      "インスタンスを生成するメソッド（Factory Method）を抽象クラスで定義し、具体的な生成処理は具象クラスに実装させます。",
    pros: "生成するクラスを柔軟に切り替えられる。コードの疎結合を促進する。",
    cons: "クラス数が多くなりがちで、構造が複雑になる可能性がある。",
    uml: `
      classDiagram
        class Creator {
          <<abstract>>
          +factoryMethod(): Product
          +someOperation(): void
        }
        class ConcreteCreator {
          +factoryMethod(): Product
        }
        class Product {
          <<interface>>
          +operation(): void
        }
        class ConcreteProduct {
          +operation(): void
        }
        Creator <|-- ConcreteCreator
        Creator ..> Product : creates
        Product <|.. ConcreteProduct
        ConcreteCreator ..> ConcreteProduct : creates
    `,
    code: {
      typescript: "/codes/design-pattern/creational/factoryMethod.ts",
      python: "/codes/design-pattern/creational/factoryMethod.py",
    },
  },
  "abstract-factory": {
    name: "Abstract Factory",
    inANutshell:
      "関連するオブジェクト群を、具体的なクラスを指定せずに生成するためのインターフェースを提供するデザインパターン。",
    purpose:
      "製品の具体的なクラスに依存せずに、製品のファミリーを作成、構成、および表現できるようにします。",
    analogy:
      "自動車工場に例えられます。ある工場（Abstract Factory）は、セダン、SUV、トラックといった異なる種類の車（Abstract Product）を生産できますが、具体的な車種（Concrete Product）は、その工場がトヨタ工場なのか、ホンダ工場なのか（Concrete Factory）によって異なります。",
    structure:
      "製品の抽象クラス（Abstract Product）と、それらを生成する抽象ファクトリ（Abstract Factory）を定義します。具体的なファクトリ（Concrete Factory）が、具体的な製品（Concrete Product）を生成します。",
    pros: "製品のファミリーを簡単に切り替えられる。クライアントコードと具体的な製品クラスの結合度を低く保てる。",
    cons: "新しい種類の製品を追加するのが難しい。",
    uml: `
      classDiagram
        class AbstractFactory {
          <<abstract>>
          +createProductA(): AbstractProductA
          +createProductB(): AbstractProductB
        }
        class ConcreteFactory1 {
          +createProductA(): AbstractProductA
          +createProductB(): AbstractProductB
        }
        class ConcreteFactory2 {
          +createProductA(): AbstractProductA
          +createProductB(): AbstractProductB
        }
        class AbstractProductA {
          <<abstract>>
          +usefulFunctionA(): void
        }
        class ConcreteProductA1 {
          +usefulFunctionA(): void
        }
        class ConcreteProductA2 {
          +usefulFunctionA(): void
        }
        class AbstractProductB {
          <<abstract>>
          +usefulFunctionB(): void
          +anotherUsefulFunctionB(AbstractProductA): void
        }
        class ConcreteProductB1 {
          +usefulFunctionB(): void
          +anotherUsefulFunctionB(AbstractProductA): void
        }
        class ConcreteProductB2 {
          +usefulFunctionB(): void
          +anotherUsefulFunctionB(AbstractProductA): void
        }
        AbstractFactory <|-- ConcreteFactory1
        AbstractFactory <|-- ConcreteFactory2
        AbstractFactory ..> AbstractProductA : creates
        AbstractFactory ..> AbstractProductB : creates
        AbstractProductA <|.. ConcreteProductA1
        AbstractProductA <|.. ConcreteProductA2
        AbstractProductB <|.. ConcreteProductB1
        AbstractProductB <|.. ConcreteProductB2
        ConcreteFactory1 ..> ConcreteProductA1 : creates
        ConcreteFactory1 ..> ConcreteProductB1 : creates
        ConcreteFactory2 ..> ConcreteProductA2 : creates
        ConcreteFactory2 ..> ConcreteProductB2 : creates
    `,
    code: {
      typescript: "/codes/design-pattern/creational/abstractFactory.ts",
      python: "/codes/design-pattern/creational/abstractFactory.py",
    },
  },
  builder: {
    name: "Builder",
    inANutshell:
      "複雑なオブジェクトの構築プロセスを、その表現から分離するデザインパターン。",
    purpose:
      "同じ構築プロセスで異なる表現のオブジェクトを作成できるようにします。",
    analogy:
      "車の組み立てに例えられます。車の設計図（Director）は同じでも、スポーツカー用の部品（Concrete Builder）を使うか、SUV用の部品（Concrete Builder）を使うかによって、完成する車（Product）は異なります。",
    structure:
      "DirectorがBuilderインターフェースを使ってオブジェクトを構築し、Concrete Builderが具体的な部品の構築と製品の組み立てを行います。",
    pros: "複雑なオブジェクトの構築を段階的に行える。構築プロセスと製品の表現を分離できる。",
    cons: "Builderクラスが多数必要になる場合がある。",
    uml: `
      classDiagram
        class Director {
          -builder: Builder
          +setBuilder(Builder): void
          +buildMinimalViableProduct(): void
          +buildFullFeaturedProduct(): void
        }
        class Builder {
          <<interface>>
          +reset(): void
          +producePartA(): void
          +producePartB(): void
          +producePartC(): void
        }
        class ConcreteBuilder {
          -product: Product
          +reset(): void
          +producePartA(): void
          +producePartB(): void
          +producePartC(): void
          +getProduct(): Product
        }
        class Product {
          -parts: string[]
          +listParts(): void
        }
        Director o-- Builder
        Builder <|.. ConcreteBuilder
        ConcreteBuilder ..> Product : creates
    `,
    code: {
      typescript: "/codes/design-pattern/creational/builder.ts",
      python: "/codes/design-pattern/creational/builder.py",
    },
  },
  prototype: {
    name: "Prototype",
    inANutshell:
      "既存のオブジェクトをコピー（複製）して新しいオブジェクトを生成するデザインパターン。",
    purpose:
      "オブジェクトの生成コストが高い場合や、オブジェクトの具体的なクラスが不明な場合に、既存のオブジェクトを複製して新しいオブジェクトを作成します。",
    analogy:
      "クッキーの型に似ています。一度クッキーの型（Prototype）を作ってしまえば、それを使って何度でも同じ形のクッキー（新しいオブジェクト）を簡単に作ることができます。",
    structure:
      "複製可能なオブジェクト（Prototype）が、自身を複製するメソッド（clone）を定義します。クライアントはPrototypeのcloneメソッドを呼び出して新しいオブジェクトを取得します。",
    pros: "オブジェクトの生成コストを削減できる。具体的なクラスに依存せずにオブジェクトを生成できる。",
    cons: "循環参照があるオブジェクトの複製が難しい。",
    uml: `
      classDiagram
        class Prototype {
          <<abstract>>
          +clone(): Prototype
        }
        class ConcretePrototype1 {
          +clone(): Prototype
        }
        class ConcretePrototype2 {
          +clone(): Prototype
        }
        Prototype <|-- ConcretePrototype1
        Prototype <|-- ConcretePrototype2
        Client --> Prototype : uses
    `,
    code: {
      typescript: "/codes/design-pattern/creational/prototype.ts",
      python: "/codes/design-pattern/creational/prototype.py",
    },
  },
  adapter: {
    name: "Adapter",
    inANutshell:
      "互換性のないインターフェースを持つクラス同士を協調させるデザインパターン。",
    purpose:
      "既存のクラスのインターフェースを変更せずに、別のインターフェースに適合させたい場合に使用します。例えば、外部ライブラリのクラスを、自分のシステムで定義されたインターフェースで利用したい場合などです。",
    analogy:
      "海外旅行で使う電源プラグのアダプターに似ています。日本のコンセントの形状（インターフェース）と、海外のコンセントの形状は異なりますが、アダプターを間に挟むことで、日本の電化製品が使えるようになります。",
    structure:
      "適合させたいクラス（Adaptee）のインスタンスを持ち、ターゲットとなるインターフェース（Target）を実装したAdapterクラスを作成します。",
    pros: "既存のコードを変更せずに、クラスを再利用できる。関連性の低いクラス同士を連携させることができる。",
    cons: "アダプタークラスが余分に増えるため、全体のコードが複雑になる可能性がある。",
    uml: `
      classDiagram
        class Target {
          <<interface>>
          +request(): void
        }
        class Adapter {
          -adaptee: Adaptee
          +request(): void
        }
        class Adaptee {
          +specificRequest(): void
        }
        Target <|.. Adapter
        Adapter --o Adaptee
    `,
    code: {
      typescript: "/codes/design-pattern/structural/adapter.ts",
      python: "/codes/design-pattern/structural/adapter.py",
    },
  },
  bridge: {
    name: "Bridge",
    inANutshell:
      "抽象化と実装を分離し、それぞれを独立して変更できるようにするデザインパターン。",
    purpose:
      "抽象化と実装の間に橋渡し（Bridge）を設けることで、両者を独立して拡張できるようにします。これにより、クラスの爆発的な増加を防ぎます。",
    analogy:
      "リモコンとテレビに例えられます。リモコン（抽象化）はテレビ（実装）のブランドに依存せず、テレビもリモコンのブランドに依存しません。両者は独立して進化できます。",
    structure:
      "抽象化（Abstraction）が実装（Implementor）への参照を持ち、クライアントからの要求をImplementorに委譲します。Implementorはインターフェースであり、具体的な実装はConcreteImplementorで行われます。",
    pros: "抽象化と実装を独立して変更・拡張できる。クラスの階層構造をシンプルに保てる。",
    cons: "初期設計が複雑になる可能性がある。",
    uml: `
      classDiagram
        class Abstraction {
          -implementor: Implementor
          +operation(): void
        }
        class RefinedAbstraction {
          +operation(): void
        }
        class Implementor {
          <<interface>>
          +operationImpl(): void
        }
        class ConcreteImplementorA {
          +operationImpl(): void
        }
        class ConcreteImplementorB {
          +operationImpl(): void
        }
        Abstraction o-- Implementor
        Abstraction <|-- RefinedAbstraction
        Implementor <|.. ConcreteImplementorA
        Implementor <|.. ConcreteImplementorB
    `,
    code: {
      typescript: "/codes/design-pattern/structural/bridge.ts",
      python: "/codes/design-pattern/structural/bridge.py",
    },
  },
  composite: {
    name: "Composite",
    inANutshell:
      "個別のオブジェクトとオブジェクトの集まり（複合オブジェクト）を同じように扱えるようにするデザインパターン。",
    purpose:
      "木構造のような再帰的な構造を持つデータを扱う際に、単一のオブジェクトと複合オブジェクトを区別せずに処理できるようにします。",
    analogy:
      "コンピュータのファイルシステムに似ています。ファイル（Leaf）とフォルダ（Composite）は異なりますが、どちらも「名前を持つ」「サイズを持つ」といった共通の操作（インターフェース）で扱うことができます。フォルダの中にさらにフォルダやファイルを入れることができます。",
    structure:
      "個別のオブジェクト（Leaf）と複合オブジェクト（Composite）が共通のインターフェース（Component）を実装します。CompositeはComponentのリストを保持し、自身への操作を内包する子要素に伝播させます。",
    pros: "木構造の操作が簡単になる。新しい種類の要素を追加するのが容易になる。",
    cons: "共通のインターフェースを定義するのが難しい場合がある。実行時の型チェックが必要になることがある。",
    uml: `
      classDiagram
        class Component {
          <<interface>>
          +operation(): void
          +add(Component): void
          +remove(Component): void
          +getChild(int): Component
        }
        class Leaf {
          +operation(): void
        }
        class Composite {
          -children: Component[]
          +operation(): void
          +add(Component): void
          +remove(Component): void
          +getChild(int): Component
        }
        Component <|.. Leaf
        Component <|-- Composite
        Composite o-- Component
    `,
    code: {
      typescript: "/codes/design-pattern/structural/composite.ts",
      python: "/codes/design-pattern/structural/composite.py",
    },
  },
  decorator: {
    name: "Decorator",
    inANutshell: "オブジェクトに動的に新しい機能を追加するデザインパターン。",
    purpose:
      "サブクラス化（継承）を使わずに、オブジェクトの機能を拡張したい場合に使用します。機能の追加や削除を柔軟に行うことができます。",
    analogy:
      "スマートフォンのケースに例えられます。基本的なスマートフォン（Component）に、耐衝撃ケース（Decorator）やバッテリー内蔵ケース（Decorator）を付け替えることで、機能を動的に追加・変更できるようなものです。",
    structure:
      "装飾されるオブジェクト（Component）と、装飾者（Decorator）が同じインターフェースを実装します。DecoratorはComponentのインスタンスを内包し、自身の処理に加えてComponentの処理を呼び出します。",
    pros: "継承よりも柔軟に機能を拡張できる。機能の組み合わせが容易になる。",
    cons: "小さなオブジェクトが多数生成され、管理が複雑になる可能性がある。",
    uml: `
      classDiagram
        class Component {
          <<interface>>
          +operation(): void
        }
        class ConcreteComponent {
          +operation(): void
        }
        class Decorator {
          <<abstract>>
          -component: Component
          +operation(): void
        }
        class ConcreteDecoratorA {
          +operation(): void
        }
        class ConcreteDecoratorB {
          +operation(): void
        }
        Component <|.. ConcreteComponent
        Component <|-- Decorator
        Decorator <|-- ConcreteDecoratorA
        Decorator <|-- ConcreteDecoratorB
        Decorator o-- Component
    `,
    code: {
      typescript: "/codes/design-pattern/structural/decorator.ts",
      python: "/codes/design-pattern/structural/decorator.py",
    },
  },
  facade: {
    name: "Facade",
    inANutshell:
      "複雑なサブシステムに対するシンプルなインターフェース（窓口）を提供するデザインパターン。",
    purpose:
      "多くのクラスや機能が絡み合った複雑なサブシステムを、クライアントが簡単に利用できるようにします。サブシステムとクライアントの間の依存関係を減らすことができます。",
    analogy:
      "劇場のチケット販売窓口（Facade）に似ています。観客は座席の予約、支払、発券といった複雑な内部処理を意識することなく、窓口に「チケットをください」と頼むだけで済みます。",
    structure:
      "Facadeクラスが、サブシステム内の複数のクラスのインスタンスを保持し、クライアントからの要求を適切なクラスに委譲します。",
    pros: "サブシステムの利用が簡単になる。サブシステムとクライアントの疎結合を促進する。",
    cons: "Facadeクラスがすべての処理を背負い込み、巨大で複雑になる可能性がある。",
    uml: `
      classDiagram
        class Facade {
          -subsystem1: Subsystem1
          -subsystem2: Subsystem2
          +operation(): void
        }
        class Subsystem1 {
          +operation1(): void
        }
        class Subsystem2 {
          +operation2(): void
        }
        Facade --o Subsystem1
        Facade --o Subsystem2
        Client --> Facade
    `,
    code: {
      typescript: "/codes/design-pattern/structural/facade.ts",
      python: "/codes/design-pattern/structural/facade.py",
    },
  },
  flyweight: {
    name: "Flyweight",
    inANutshell:
      "多数の小さなオブジェクトを効率的に扱うために、オブジェクトの共有を促進するデザインパターン。",
    purpose:
      "オブジェクトの数を減らすことで、メモリ使用量やパフォーマンスを最適化します。特に、多くのオブジェクトが共通の情報を持ち、一部の情報のみが異なる場合に有効です。",
    analogy:
      "文字のフォントに例えられます。文書中の各文字は異なる位置に表示されますが、同じフォント、サイズ、色を持つ文字は、それらの情報を共有できます。個々の文字オブジェクトがフォント情報をすべて持つのではなく、共有されたフォントオブジェクトを参照します。",
    structure:
      "共有されるべき状態（intrinsic state）を持つFlyweightオブジェクトと、共有されない状態（extrinsic state）を持つクライアントオブジェクトに分けます。FlyweightFactoryがFlyweightオブジェクトの生成と管理を行います。",
    pros: "メモリ使用量を削減できる。オブジェクトの生成コストを削減できる。",
    cons: "状態の共有と非共有の区別が難しい。複雑さが増す可能性がある。",
    uml: `
      classDiagram
        class FlyweightFactory {
          -flyweights: Map<string, Flyweight>
          +getFlyweight(key: string): Flyweight
        }
        class Flyweight {
          +operation(extrinsicState: any): void
        }
        class ConcreteFlyweight {
          -intrinsicState: any
          +operation(extrinsicState: any): void
        }
        class UnsharedConcreteFlyweight {
          -allState: any
          +operation(extrinsicState: any): void
        }
        FlyweightFactory ..> Flyweight : creates
        Flyweight <|.. ConcreteFlyweight
        Flyweight <|.. UnsharedConcreteFlyweight
        Client --> FlyweightFactory
        Client --> Flyweight
    `,
    code: {
      typescript: "/codes/design-pattern/structural/flyweight.ts",
      python: "/codes/design-pattern/structural/flyweight.py",
    },
  },
  proxy: {
    name: "Proxy",
    inANutshell:
      "他のオブジェクトへのアクセスを制御するための代理（Proxy）を提供するデザインパターン。",
    purpose:
      "オブジェクトへのアクセスを遅延させたり、アクセス制御を行ったり、追加の処理（ロギング、キャッシュなど）を挿入したりするために使用されます。",
    analogy:
      "クレジットカードに似ています。クレジットカード（Proxy）は、銀行口座（Real Subject）への直接アクセスをせずに、支払いを代行します。これにより、セキュリティチェックや利用限度額の確認などの追加処理が行われます。",
    structure:
      "ProxyクラスがReal Subjectと同じインターフェースを実装し、Real Subjectへの参照を持ちます。クライアントからの要求をProxyが受け取り、必要に応じてReal Subjectに処理を委譲します。",
    pros: "オブジェクトへのアクセスを制御できる。追加の処理を透過的に挿入できる。",
    cons: "応答時間が遅くなる可能性がある。複雑さが増す可能性がある。",
    uml: `
      classDiagram
        class Subject {
          <<interface>>
          +request(): void
        }
        class RealSubject {
          +request(): void
        }
        class Proxy {
          -realSubject: RealSubject
          +request(): void
        }
        Subject <|.. RealSubject
        Subject <|.. Proxy
        Proxy o-- RealSubject
        Client --> Subject
    `,
    code: {
      typescript: "/codes/design-pattern/structural/proxy.ts",
      python: "/codes/design-pattern/structural/proxy.py",
    },
  },
  "chain-of-responsibility": {
    name: "Chain of Responsibility",
    inANutshell:
      "要求を処理するオブジェクトのチェーンを構築し、要求をそのチェーンに沿って渡すデザインパターン。",
    purpose:
      "要求の送信者と受信者を分離し、複数のオブジェクトが要求を処理する機会を持つようにします。どのオブジェクトが要求を処理するかを動的に決定できます。",
    analogy:
      "社内の承認プロセスに似ています。社員が申請書を提出すると、まず直属の上司が承認し、次に部長、そして社長へと、承認権限を持つ人が順に処理を試みます。誰かが承認すれば、それ以上は回覧されません。",
    structure:
      "Handlerインターフェースが要求を処理するメソッドと、次のHandlerへの参照を定義します。ConcreteHandlerが具体的な処理を行い、処理できない場合は次のHandlerに要求を渡します。",
    pros: "送信者と受信者の結合度を低く保てる。処理の順序を柔軟に変更できる。",
    cons: "要求が処理されない可能性がある。デバッグが難しい場合がある。",
    uml: `
      classDiagram
        class Handler {
          <<abstract>>
          +setNext(Handler): Handler
          +handle(request: string): string
        }
        class ConcreteHandlerA {
          +handle(request: string): string
        }
        class ConcreteHandlerB {
          +handle(request: string): string
        }
        class ConcreteHandlerC {
          +handle(request: string): string
        }
        Handler <|-- ConcreteHandlerA
        Handler <|-- ConcreteHandlerB
        Handler <|-- ConcreteHandlerC
        Handler o-- Handler : nextHandler
        Client --> Handler
    `,
    code: {
      typescript: "/codes/design-pattern/behavioral/chainOfResponsibility.ts",
      python: "/codes/design-pattern/behavioral/chainOfResponsibility.py",
    },
  },
  command: {
    name: "Command",
    inANutshell:
      "要求をオブジェクトとしてカプセル化し、パラメータ化、キューイング、ロギング、取り消しなどの操作を可能にするデザインパターン。",
    purpose:
      "操作（要求）をオブジェクトとして表現することで、操作の実行者と操作自体を分離します。これにより、操作の取り消しや再実行、ログ記録などが容易になります。",
    analogy:
      "レストランの注文に似ています。客（Client）がウェイター（Invoker）に注文（Command）を伝えると、ウェイターは注文をメモ（Commandオブジェクト）し、それを厨房（Receiver）に渡します。厨房はメモに基づいて料理を作ります。",
    structure:
      "Commandインターフェースが実行メソッド（execute）を定義します。ConcreteCommandがReceiverへの参照を持ち、executeメソッドでReceiverの操作を呼び出します。InvokerがCommandを保持し、executeメソッドを呼び出します。",
    pros: "操作の取り消しや再実行が容易になる。操作のログ記録が可能になる。操作の実行者と操作自体を分離できる。",
    cons: "クラス数が多くなる可能性がある。",
    uml: `
      classDiagram
        class Command {
          <<interface>>
          +execute(): void
        }
        class ConcreteCommand {
          -receiver: Receiver
          +execute(): void
        }
        class Receiver {
          +action(): void
        }
        class Invoker {
          -command: Command
          +setCommand(Command): void
          +executeCommand(): void
        }
        Command <|.. ConcreteCommand
        ConcreteCommand o-- Receiver
        Invoker o-- Command
        Client --> Invoker
        Client --> Receiver
    `,
    code: {
      typescript: "/codes/design-pattern/behavioral/command.ts",
      python: "/codes/design-pattern/behavioral/command.py",
    },
  },
  iterator: {
    name: "Iterator",
    inANutshell:
      "コレクションの内部表現を公開せずに、その要素に順次アクセスする手段を提供するデザインパターン。",
    purpose:
      "異なる種類のコレクション（リスト、ツリーなど）に対して、統一された方法で要素を走査できるようにします。コレクションの内部構造に依存しないコードを書くことができます。",
    analogy:
      "テレビのチャンネルを切り替えるリモコンに似ています。リモコン（Iterator）を使えば、テレビの内部構造（チャンネルの並び方など）を知らなくても、順番にチャンネルを切り替えることができます。",
    structure:
      "Iteratorインターフェースが要素へのアクセスと次の要素への移動を定義します。ConcreteIteratorが特定のコレクションの走査ロジックを実装します。AggregateインターフェースがIteratorを作成するメソッドを定義します。",
    pros: "コレクションの内部構造を隠蔽できる。異なるコレクションに対して統一された走査方法を提供できる。",
    cons: "シンプルなコレクションではオーバーヘッドになる可能性がある。",
    uml: `
      classDiagram
        class Iterator {
          <<interface>>
          +next(): any
          +hasNext(): boolean
        }
        class ConcreteIterator {
          -collection: any[]
          -position: number
          +next(): any
          +hasNext(): boolean
        }
        class Aggregate {
          <<interface>>
          +createIterator(): Iterator
        }
        class ConcreteAggregate {
          -items: any[]
          +createIterator(): Iterator
        }
        Iterator <|.. ConcreteIterator
        Aggregate <|.. ConcreteAggregate
        ConcreteAggregate ..> ConcreteIterator : creates
        Client --> Aggregate
        Client --> Iterator
    `,
    code: {
      typescript: "/codes/design-pattern/behavioral/iterator.ts",
      python: "/codes/design-pattern/behavioral/iterator.py",
    },
  },
  mediator: {
    name: "Mediator",
    inANutshell:
      "オブジェクト間の相互作用をカプセル化するオブジェクトを定義するデザインパターン。",
    purpose:
      "多数のオブジェクトが直接相互作用することで発生する複雑な依存関係を減らします。Mediatorを介して通信することで、オブジェクト間の結合度を低く保ちます。",
    analogy:
      "航空管制官に似ています。空港の各飛行機（Colleague）は直接通信するのではなく、管制官（Mediator）を介して通信します。これにより、飛行機間の衝突を防ぎ、スムーズな交通を維持します。",
    structure:
      "MediatorインターフェースがColleague間の通信メソッドを定義します。ConcreteMediatorが具体的な通信ロジックを実装します。ColleagueはMediatorへの参照を持ち、Mediatorを介して他のColleagueと通信します。",
    pros: "オブジェクト間の結合度を低く保てる。オブジェクト間の通信ロジックを一元管理できる。",
    cons: "Mediatorが巨大になり、複雑になる可能性がある。",
    uml: `
      classDiagram
        class Mediator {
          <<abstract>>
          +notify(sender: Component, event: string): void
        }
        class ConcreteMediator {
          -component1: Component1
          -component2: Component2
          +notify(sender: Component, event: string): void
        }
        class Component {
          -mediator: Mediator
          +setMediator(Mediator): void
        }
        class Component1 {
          +doA(): void
          +doB(): void
        }
        class Component2 {
          +doC(): void
          +doD(): void
        }
        Mediator <|-- ConcreteMediator
        Component <|-- Component1
        Component <|-- Component2
        ConcreteMediator o-- Component1
        ConcreteMediator o-- Component2
        Client --> Mediator
        Client --> Component
    `,
    code: {
      typescript: "/codes/design-pattern/behavioral/mediator.ts",
      python: "/codes/design-pattern/behavioral/mediator.py",
    },
  },
  memento: {
    name: "Memento",
    inANutshell:
      "オブジェクトの内部状態を外部に公開せずに保存し、後でその状態に復元できるようにするデザインパターン。",
    purpose:
      "オブジェクトの「元に戻す」機能（Undo）や履歴管理を実装するために使用されます。オブジェクトのカプセル化を破ることなく状態を保存できます。",
    analogy:
      "ゲームのセーブ機能に似ています。プレイヤー（Originator）はゲームの進行状況（State）をセーブデータ（Memento）として保存し、後でそのセーブデータを使ってゲームを再開（復元）できます。セーブデータの中身を直接操作することはありません。",
    structure:
      "Originatorが自身の状態を保存・復元するメソッドを定義します。MementoがOriginatorの状態を保持します。CaretakerがMementoを管理し、Originatorの状態を保存・復元します。",
    pros: "オブジェクトのカプセル化を維持できる。Undo/Redo機能の実装が容易になる。",
    cons: "Mementoが大量に生成されるとメモリを消費する。状態の保存・復元が複雑になる場合がある。",
    uml: `
      classDiagram
        class Originator {
          -state: string
          +setState(state: string): void
          +save(): Memento
          +restore(memento: Memento): void
        }
        class Memento {
          -state: string
          +getState(): string
        }
        class Caretaker {
          -mementos: Memento[]
          +addMemento(memento: Memento): void
          +getMemento(index: number): Memento
        }
        Originator ..> Memento : creates
        Caretaker o-- Memento
        Client --> Originator
        Client --> Caretaker
    `,
    code: {
      typescript: "/codes/design-pattern/behavioral/memento.ts",
      python: "/codes/design-pattern/behavioral/memento.py",
    },
  },
  observer: {
    name: "Observer",
    inANutshell:
      "オブジェクトの状態変化を、依存する他のオブジェクトに自動的に通知して更新するデザインパターン。",
    purpose:
      "あるオブジェクト（Subject）の状態が変化したときに、そのオブジェクトに依存する複数のオブジェクト（Observer）に通知を送る仕組みを提供します。出版-購読モデルとしても知られています。",
    analogy:
      "雑誌の定期購読に似ています。読者（Observer）が出版社（Subject）に購読を申し込むと、新しい号が発行されるたびに自動的に雑誌が送られてきます。読者は毎号出版社に問い合わせる必要はありません。",
    structure:
      "SubjectはObserverのリストを保持し、Observerを追加・削除するメソッドを提供します。自身の状態が変化したときに、リスト内のすべてのObserverに通知（notify）します。",
    pros: "SubjectとObserverの間の結合度を低く保てる。動的にObserverを追加・削除できる。",
    cons: "通知の順序が保証されない。意図しないカスケード更新が発生する可能性がある。",
    uml: `
      classDiagram
        class Subject {
          -observers: Observer[]
          +attach(Observer): void
          +detach(Observer): void
          +notify(): void
        }
        class ConcreteSubject {
          -state: any
          +getState(): any
          +setState(any): void
        }
        class Observer {
          <<interface>>
          +update(Subject): void
        }
        class ConcreteObserver {
          -observerState: any
          +update(Subject): void
        }
        Subject <|-- ConcreteSubject
        Observer <|.. ConcreteObserver
        Subject o-- Observer
    `,
    code: {
      typescript: "/codes/design-pattern/behavioral/observer.ts",
      python: "/codes/design-pattern/behavioral/observer.py",
    },
  },
  state: {
    name: "State",
    inANutshell:
      "オブジェクトの内部状態に応じてその振る舞いを変更できるようにするデザインパターン。オブジェクトは、あたかもクラスが変更されたかのように見えます。",
    purpose:
      "オブジェクトの振る舞いがその状態に依存する場合に、状態ごとに異なる振る舞いをカプセル化し、状態遷移を明確に定義します。if-else文の肥大化を防ぎます。",
    analogy:
      "信号機に似ています。信号機（Context）は「赤」「黄」「青」（State）という状態を持ち、それぞれの状態に応じて異なる振る舞い（車の停止、注意、進行）をします。状態が変わると、信号機の振る舞いも変わります。",
    structure:
      "ContextクラスがStateインターフェースへの参照を持ち、クライアントからの要求を現在のStateオブジェクトに委譲します。Stateインターフェースが状態ごとの振る舞いを定義し、ConcreteStateが具体的な振る舞いを実装します。",
    pros: "状態ごとの振る舞いを明確に分離できる。状態遷移ロジックを一元管理できる。if-else文が減り、コードがすっきりする。",
    cons: "クラス数が多くなる可能性がある。",
    uml: `
      classDiagram
        class Context {
          -state: State
          +setState(State): void
          +request(): void
        }
        class State {
          <<interface>>
          +handle(Context): void
        }
        class ConcreteStateA {
          +handle(Context): void
        }
        class ConcreteStateB {
          +handle(Context): void
        }
        Context o-- State
        State <|.. ConcreteStateA
        State <|.. ConcreteStateB
        Client --> Context
    `,
    code: {
      typescript: "/codes/design-pattern/behavioral/state.ts",
      python: "/codes/design-pattern/behavioral/state.py",
    },
  },
  strategy: {
    name: "Strategy",
    inANutshell:
      "アルゴリズムのファミリーを定義し、それぞれをカプセル化して、動的に切り替えられるようにするデザインパターン。",
    purpose:
      "同じ問題を解決するための複数のアルゴリズムがあり、クライアントが状況に応じてそれらを使い分けたい場合に使用します。if-else文の肥大化を防ぎます。",
    analogy:
      "交通手段の選択に似ています。目的地に行くという目的（Context）は同じでも、状況に応じて徒歩、自転車、電車（Strategy）といった異なる手段を柔軟に切り替えることができます。",
    structure:
      "共通のインターフェース（Strategy）を定義し、具体的なアルゴリズムをそれぞれ具象クラス（ConcreteStrategy）として実装します。ContextクラスがStrategyのインスタンスを保持し、クライアントの要求に応じて処理を委譲します。",
    pros: "アルゴリズムの追加や変更が容易になる。if-else文が減り、コードがすっきりする。",
    cons: "クラス数が多くなる。クライアントが各Strategyの違いを理解している必要がある。",
    uml: `
      classDiagram
        class Context {
          -strategy: Strategy
          +setStrategy(Strategy): void
          +executeStrategy(): void
        }
        class Strategy {
          <<interface>>
          +execute(): void
        }
        class ConcreteStrategyA {
          +execute(): void
        }
        class ConcreteStrategyB {
          +execute(): void
        }
        Context o-- Strategy
        Strategy <|.. ConcreteStrategyA
        Strategy <|.. ConcreteStrategyB
    `,
    code: {
      typescript: "/codes/design-pattern/behavioral/strategy.ts",
      python: "/codes/design-pattern/behavioral/strategy.py",
    },
  },
  "template-method": {
    name: "Template Method",
    inANutshell:
      "アルゴリズムの骨格を定義し、具体的な処理の一部をサブクラスに任せるデザインパターン。",
    purpose:
      "処理の共通部分をスーパークラスで管理し、可変部分のみをサブクラスで実装させることで、コードの再利用性を高めます。",
    analogy:
      "料理のレシピに似ています。カレーを作るという手順（Template Method）は決まっていますが、具材（肉、野菜の種類）や辛さといった具体的な部分（サブクラスでの実装）は、作る人が自由に決めることができます。",
    structure:
      "スーパークラス（AbstractClass）でアルゴリズムの骨格となるメソッド（Template Method）を定義します。このメソッド内で、サブクラスで実装される抽象メソッド（primitive operations）を呼び出します。",
    pros: "コードの重複を排除できる。アルゴリズムの骨格を固定し、サブクラスでの実装を強制できる。",
    cons: "サブクラスの振る舞いがスーパークラスによって制限される。",
    uml: `
      classDiagram
        class AbstractClass {
          +templateMethod(): void
          #primitiveOperation1(): void
          #primitiveOperation2(): void
        }
        class ConcreteClass {
          #primitiveOperation1(): void
          #primitiveOperation2(): void
        }
        AbstractClass <|-- ConcreteClass
    `,
    code: {
      typescript: "/codes/design-pattern/behavioral/templateMethod.ts",
      python: "/codes/design-pattern/behavioral/templateMethod.py",
    },
  },
  visitor: {
    name: "Visitor",
    inANutshell:
      "オブジェクト構造の要素に対して実行される操作を、その要素のクラスを変更せずに定義するデザインパターン。",
    purpose:
      "既存のクラスに新しい操作を追加したいが、そのクラスを変更したくない場合に使用します。特に、多くの異なる操作をオブジェクト構造の要素に対して適用する必要がある場合に有効です。",
    analogy:
      "税務調査官に似ています。税務調査官（Visitor）は、様々な種類の企業（Element）を訪問し、それぞれの企業に対して異なる方法で税務調査（Operation）を行います。企業側は、税務調査官が来るたびに自社のコードを変更する必要はありません。",
    structure:
      "Visitorインターフェースが、訪問する各ConcreteElementに対応するvisitメソッドを定義します。Elementインターフェースがacceptメソッドを定義し、Visitorを受け入れます。ConcreteElementがacceptメソッドを実装し、自身に対応するvisitメソッドを呼び出します。",
    pros: "既存のクラスを変更せずに新しい操作を追加できる。関連する操作をVisitorクラスに一元化できる。",
    cons: "新しいConcreteElementを追加するのが難しい。Visitorがオブジェクト構造の内部にアクセスする必要があるため、カプセル化が破られる可能性がある。",
    uml: `
      classDiagram
        class Visitor {
          <<interface>>
          +visitConcreteElementA(element: ConcreteElementA): void
          +visitConcreteElementB(element: ConcreteElementB): void
        }
        class ConcreteVisitor1 {
          +visitConcreteElementA(element: ConcreteElementA): void
          +visitConcreteElementB(element: ConcreteElementB): void
        }
        class ConcreteVisitor2 {
          +visitConcreteElementA(element: ConcreteElementA): void
          +visitConcreteElementB(element: ConcreteElementB): void
        }
        class Element {
          <<interface>>
          +accept(visitor: Visitor): void
        }
        class ConcreteElementA {
          +accept(visitor: Visitor): void
          +operationA(): void
        }
        class ConcreteElementB {
          +accept(visitor: Visitor): void
          +operationB(): void
        }
        Element <|.. ConcreteElementA
        Element <|.. ConcreteElementB
        Visitor <|.. ConcreteVisitor1
        Visitor <|.. ConcreteVisitor2
        ConcreteElementA ..> Visitor : calls visitConcreteElementA
        ConcreteElementB ..> Visitor : calls visitConcreteElementB
        Client --> Element
        Client --> Visitor
    `,
    code: {
      typescript: "/codes/design-pattern/behavioral/visitor.ts",
      python: "/codes/design-pattern/behavioral/visitor.py",
    },
  },
  interpreter: {
    name: "Interpreter",
    inANutshell:
      "特定の言語の文法を表現するための文法表現と、その文法に従って文を解釈するためのインタープリタを提供するデザインパターン。",
    purpose:
      "特定の言語（ドメイン固有言語など）の文法を定義し、その文法に従って記述された文を解釈するために使用されます。複雑なパーサーを構築する代わりに、シンプルな文法ツリーを構築して解釈します。",
    analogy:
      "音楽の楽譜と演奏者に似ています。楽譜（Abstract Syntax Tree）は音楽の文法（Grammar）を表現し、演奏者（Interpreter）は楽譜を解釈して音楽を演奏します。",
    structure:
      "AbstractExpressionが解釈メソッド（interpret）を定義します。TerminalExpressionが終端記号を解釈し、NonterminalExpressionが非終端記号を解釈します。Contextが解釈に必要な情報を提供します。",
    pros: "文法をクラス階層で表現できる。文法の変更や拡張が容易になる。",
    cons: "複雑な文法には向かない。クラス数が多くなる可能性がある。",
    uml: `
      classDiagram
        class AbstractExpression {
          <<abstract>>
          +interpret(context: Context): void
        }
        class TerminalExpression {
          +interpret(context: Context): void
        }
        class NonterminalExpression {
          -expression1: AbstractExpression
          -expression2: AbstractExpression
          +interpret(context: Context): void
        }
        class Context {
          -data: string
          +getData(): string
          +setData(data: string): void
        }
        AbstractExpression <|-- TerminalExpression
        AbstractExpression <|-- NonterminalExpression
        NonterminalExpression o-- AbstractExpression
        Client --> AbstractExpression
        Client --> Context
    `,
    code: {
      typescript: "/codes/design-pattern/behavioral/interpreter.ts",
      python: "/codes/design-pattern/behavioral/interpreter.py",
    },
  },
};

type Source = MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, unknown>
>;

const PatternPage: React.FC<PatternPageProps> = ({ params }) => {
  const resolvedParams = React.use(params);
  const { patternName } = resolvedParams;

  const [tsSource, setTsSource] = useState<Source | null>(null);
  const [pySource, setPySource] = useState<Source | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<"typescript" | "python">(
    "typescript"
  );
  const [activeInfoTab, setActiveInfoTab] = useState<"explanation" | "code">(
    "explanation"
  );

  const currentPattern = patternMap[patternName] || patternMap["singleton"];

  useEffect(() => {
    const compileSource = async () => {
      if (!currentPattern) return;
      const { code } = currentPattern;

      try {
        const tsCodeResponse = await fetch(code.typescript);
        const tsCode = await tsCodeResponse.text();
        const ts = await serialize(tsCode, {
          mdxOptions: { rehypePlugins: [rehypePrettyCode] },
        });
        setTsSource(ts);
      } catch (e) {
        setTsSource(null);
      }

      try {
        const pyCodeResponse = await fetch(code.python);
        const pyCode = await pyCodeResponse.text();
        const py = await serialize(pyCode, {
          mdxOptions: { rehypePlugins: [rehypePrettyCode] },
        });
        setPySource(py);
      } catch (e) {
        setPySource(null);
      }
    };
    compileSource();
  }, [patternName, currentPattern]);

  const components = {
    pre: CodeBlock,
  };

  if (!currentPattern) {
    return (
      <div className="container mx-auto p-4 md:p-8">Pattern not found.</div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white text-center">
        {currentPattern.name}
      </h1>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            図解エリア
          </h2>
          <div className="mb-8 flex justify-center">
            <Mermaid chart={currentPattern.uml} />
          </div>
        </div>

        <div className="flex flex-col space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <button
                className={`py-2 px-4 text-sm font-medium ${
                  activeInfoTab === "explanation"
                    ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveInfoTab("explanation")}
              >
                解説
              </button>
              <button
                className={`py-2 px-4 text-sm font-medium ${
                  activeInfoTab === "code"
                    ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveInfoTab("code")}
              >
                コード例
              </button>
            </div>

            {activeInfoTab === "explanation" && (
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div>
                  <h3 className="text-xl font-semibold mb-2">一言でいうと</h3>
                  <p>{currentPattern.inANutshell}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">目的</h3>
                  <p>{currentPattern.purpose}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">例え話</h3>
                  <p>{currentPattern.analogy}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">構造</h3>
                  <p>{currentPattern.structure}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">メリット</h3>
                  <p>{currentPattern.pros}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">デメリット</h3>
                  <p>{currentPattern.cons}</p>
                </div>
              </div>
            )}

            {activeInfoTab === "code" && (
              <div>
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                  <button
                    className={`py-2 px-4 text-sm font-medium ${
                      activeCodeTab === "typescript"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                    onClick={() => setActiveCodeTab("typescript")}
                  >
                    TypeScript
                  </button>
                  <button
                    className={`py-2 px-4 text-sm font-medium ${
                      activeCodeTab === "python"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                    onClick={() => setActiveCodeTab("python")}
                  >
                    Python
                  </button>
                </div>
                <div className="mt-4">
                  {activeCodeTab === "typescript" && tsSource && (
                    <MDXRemote {...tsSource} components={components} />
                  )}
                  {activeCodeTab === "python" && pySource && (
                    <MDXRemote {...pySource} components={components} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternPage;
