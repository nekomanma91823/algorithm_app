import React from "react";
import {
  BoxSelect,
  Factory,
  Blocks,
  Layers,
  Copy,
  Plug,
  GitBranch,
  Paintbrush,
  Library,
  Share2,
  Shield,
  Workflow,
  ClipboardCheck,
  ScrollText,
  TowerControl,
  History,
  Rss,
  ToggleLeft,
  Route,
  LayoutTemplate,
  Footprints,
  BookOpenCheck,
  Network,
} from "lucide-react";

export interface PatternDetails {
  name: string;
  description: string;
  example: string;
  pros: string[];
  cons: string[];
  structure: string[];

  code: {
    javascript: string;
    python: string;
  };
  icon: React.JSX.Element;
}
export const patternMap: { [key: string]: PatternDetails } = {
  singleton: {
    name: "Singleton",
    description:
      "あるクラスのインスタンスがプログラム全体で1つしか存在しないことを保証するデザインパターンです。データベース接続や設定ファイルなど、全体で共有されるべきリソースへのアクセスを単一の窓口に限定します。",
    example:
      "学校に校長先生が一人しかいない状況に例えられます。誰が校長先生を呼んでも、必ず同じ一人の校長先生が対応します。",
    pros: [
      "インスタンスが1つであることを保証できる。",
      "グローバル変数のようにどこからでもアクセスできる。",
    ],
    cons: [
      "単体テストが難しくなる場合がある。",
      "依存関係が隠蔽されやすい。",
      "密結合なコードを生みやすく、単一責任の原則に違反しやすい。",
    ],
    structure: [
      "クラス自身が唯一のインスタンスを保持します。",
      "そのインスタンスを取得するための静的メソッドを提供します。",
      "コンストラクタは外部から呼び出せないように private にします。",
    ],
    code: {
      javascript: "/codes/design-pattern/creational/singleton.ts",
      python: "/codes/design-pattern/creational/singleton.py",
    },
    icon: <BoxSelect />,
  },
  "factory-method": {
    name: "Factory Method",
    description:
      "オブジェクトの生成処理をサブクラスに任せるデザインパターンです。どのクラスのインスタンスを生成するかをサブクラスに決定させることで、クラスの拡張性を高めます。",
    example:
      "ピザ屋の注文に例えられます。「ピザを注文する」というインターフェースは決まっていますが、実際にどのピザを作るかは、各店舗（サブクラス）に任されています。",
    pros: ["生成するクラスを柔軟に切り替えられる", "コードの疎結合を促進する"],
    cons: ["クラス数が多くなりがちで、構造が複雑になる可能性がある。"],
    structure: [
      "インスタンスを生成するメソッド（Factory Method）を抽象クラスで定義します。",
      "具体的な生成処理は具象クラスに実装させます。",
    ],
    code: {
      javascript: "/codes/design-pattern/creational/factoryMethod.ts",
      python: "/codes/design-pattern/creational/factoryMethod.py",
    },
    icon: <Factory />,
  },
  "abstract-factory": {
    name: "Abstract Factory",
    description:
      "関連するオブジェクト群を、具体的なクラスを指定せずに生成するためのインターフェースを提供するパターンです。",
    example:
      "自動車工場に例えられます。ある工場（Abstract Factory）は異なる種類の車を生産できますが、具体的な車種は、その工場がどのブランドか（Concrete Factory）によって異なります。",
    pros: [
      "製品のファミリーを簡単に切り替えられる。",
      "クライアントコードと具体的な製品クラスの結合度を低く保てる。",
    ],
    cons: ["新しい種類の製品を追加するのが難しい。"],
    structure: [
      "製品の抽象クラス（Abstract Product）を定義します。",
      "それらを生成する抽象ファクトリ（Abstract Factory）を定義します。",
      "具体的なファクトリ（Concrete Factory）が、具体的な製品を生成します。",
    ],
    code: {
      javascript: "/codes/design-pattern/creational/abstractFactory.ts",
      python: "/codes/design-pattern/creational/abstractFactory.py",
    },
    icon: <Blocks />,
  },
  builder: {
    name: "Builder",
    description:
      "複雑なオブジェクトの構築プロセスを、その表現から分離するデザインパターン。同じ構築プロセスで異なる表現のオブジェクトを作成できるようにします。",
    example:
      "車の組み立てに例えられ、設計図（Director）は同じでも、使う部品（Builder）によって完成する車（Product）は異なります。",
    pros: [
      "複雑なオブジェクトの構築を段階的に行える。",
      "構築プロセスと製品の表現を分離できる。",
      "**多数の引数を持つコンストラクタを不要にし、可読性を高める。**",
    ],
    cons: ["Builderクラスが多数必要になる場合がある。"],
    structure: [
      "DirectorがBuilderインターフェースを使ってオブジェクトを構築します。",
      "Concrete Builderが具体的な部品の構築と製品の組み立てを行います。",
    ],
    code: {
      javascript: "/codes/design-pattern/creational/builder.ts",
      python: "/codes/design-pattern/creational/builder.py",
    },
    icon: <Layers />,
  },
  prototype: {
    name: "Prototype",
    description:
      "既存のオブジェクトをコピー（複製）して新しいオブジェクトを生成するデザインパターン。オブジェクトの生成コストが高い場合や、オブジェクトの具体的なクラスが不明な場合に、既存のオブジェクトを複製して新しいオブジェクトを作成します。",
    example:
      "クッキーの型に似ています。一度クッキーの型（Prototype）を作ってしまえば、それを使って何度でも同じ形のクッキー（新しいオブジェクト）を簡単に作ることができます。",
    pros: [
      "オブジェクトの生成コストを削減できる。",
      "具体的なクラスに依存せずにオブジェクトを生成できる。",
    ],
    cons: [
      "循環参照があるオブジェクトの複製が難しい。",
      "深いコピー（ディープコピー）の実装が複雑になる場合がある。",
    ],
    structure: [
      "複製可能なオブジェクト（Prototype）が、自身を複製するメソッド（clone）を定義します。",
      "クライアントはPrototypeのcloneメソッドを呼び出して新しいオブジェクトを取得します。",
    ],
    code: {
      javascript: "/codes/design-pattern/creational/prototype.ts",
      python: "/codes/design-pattern/creational/prototype.py",
    },
    icon: <Copy />,
  },
  adapter: {
    name: "Adapter",
    description:
      "互換性のないインターフェースを持つクラス同士を協調させるデザインパターン。クラスを継承する方法と、インスタンスを内包する方法がある。",
    example:
      "海外旅行で使う電源プラグのアダプターに似ています。アダプターを間に挟むことで、異なるインターフェースを持つクラスが連携できるようになります。",
    pros: [
      "既存のコードを変更せずに、クラスを再利用できる。",
      "関連性の低いクラス同士を連携させることができる。",
    ],
    cons: [
      "アダプタークラスが余分に増えるため、全体のコードが複雑になる可能性がある。",
    ],
    structure: [
      "ターゲットとなるインターフェース（Target）を定義します。",
      "適合させたいクラス（Adaptee）のインスタンスを持ち、Targetを実装したAdapterクラスを作成します。",
    ],
    code: {
      javascript: "/codes/design-pattern/structural/adapter.ts",
      python: "/codes/design-pattern/structural/adapter.py",
    },
    icon: <Plug />,
  },
  bridge: {
    name: "Bridge",
    description:
      "抽象化と実装を分離し、それぞれを独立して変更できるようにするデザインパターン。機能と実装の2つの次元でクラス階層が複雑になるのを防ぐ。",
    example:
      "リモコン（抽象化）とテレビ（実装）に例えられ、両者は独立して進化できます。",
    pros: [
      "抽象化と実装を独立して変更・拡張できる。",
      "クラスの階層構造をシンプルに保てる。",
    ],
    cons: ["初期設計が複雑になる可能性がある。"],
    structure: [
      "抽象化（Abstraction）が実装（Implementor）への参照を持ちます。",
      "クライアントからの要求をAbstractionが受け、Implementorに委譲します。",
      "Implementorはインターフェースであり、具体的な実装はConcreteImplementorで行われます。",
    ],
    code: {
      javascript: "/codes/design-pattern/structural/bridge.ts",
      python: "/codes/design-pattern/structural/bridge.py",
    },
    icon: <GitBranch />,
  },
  composite: {
    name: "Composite",
    description:
      "個別のオブジェクトとオブジェクトの集まり（複合オブジェクト）を同じように扱えるようにするデザインパターン。",
    example:
      "コンピュータのファイルシステムに似ており、ファイル（Leaf）とフォルダ（Composite）を共通の操作で扱えます。",
    pros: [
      "木構造の操作が簡単になる。",
      "新しい種類の要素を追加するのが容易になる。",
    ],
    cons: [
      "共通のインターフェースを定義するのが難しい場合がある。",
      "実行時の型チェックが必要になることがある。",
    ],
    structure: [
      "個別のオブジェクト（Leaf）と複合オブジェクト（Composite）が共通のインターフェース（Component）を実装します。",
      "CompositeはComponentのリストを保持し、自身への操作を内包する子要素に伝播させます。",
    ],
    code: {
      javascript: "/codes/design-pattern/structural/composite.ts",
      python: "/codes/design-pattern/structural/composite.py",
    },
    icon: <Network />,
  },
  decorator: {
    name: "Decorator",
    description:
      "オブジェクトに動的に新しい機能を追加するデザインパターン。サブクラス化を使わずに、オブジェクトの機能を拡張したい場合に使用します。",
    example:
      "スマートフォンのケースに例えられ、基本的なスマートフォンに機能を追加するようなものです。",
    pros: [
      "継承よりも柔軟に機能を拡張できる。",
      "機能の組み合わせが容易になる。",
    ],
    cons: [
      "小さなオブジェクトが多数生成され、管理が複雑になる可能性がある。",
      "デバッグが難しくなったり、オブジェクトの同一性（===）の判定で問題が起きたりすることがある。",
    ],
    structure: [
      "装飾されるオブジェクト（Component）と、装飾者（Decorator）が同じインターフェースを実装します。",
      "DecoratorはComponentのインスタンスを内包します。",
      "Decoratorは自身の処理に加えてComponentの処理を呼び出します。",
    ],
    code: {
      javascript: "/codes/design-pattern/structural/decorator.ts",
      python: "/codes/design-pattern/structural/decorator.py",
    },
    icon: <Paintbrush />,
  },
  facade: {
    name: "Facade",
    description:
      "複雑なサブシステムに対するシンプルなインターフェース（窓口）を提供するデザインパターン。",
    example:
      "劇場のチケット販売窓口（Facade）に似ており、利用者は複雑な内部処理を意識せずにサービスを利用できます。",
    pros: [
      "サブシステムの利用が簡単になる。",
      "サブシステムとクライアントの疎結合を促進する。",
    ],
    cons: [
      "Facadeクラスがすべての処理を背負い込み、巨大で複雑になる可能性がある。",
    ],
    structure: [
      "Facadeクラスが、サブシステム内の複数のクラスのインスタンスを保持します。",
      "クライアントからの要求をFacadeが受け、適切なクラスに処理を委譲します。",
    ],
    code: {
      javascript: "/codes/design-pattern/structural/facade.ts",
      python: "/codes/design-pattern/structural/facade.py",
    },
    icon: <Library />,
  },
  flyweight: {
    name: "Flyweight",
    description:
      "多数の小さなオブジェクトを効率的に扱うために、オブジェクトの共有を促進するデザインパターン。",
    example:
      "文字のフォントに例えられ、共通の情報（フォント、サイズ）を共有することでメモリ使用量を最適化します。",
    pros: [
      "メモリ使用量を削減できる。",
      "オブジェクトの生成コストを削減できる。",
    ],
    cons: ["状態の共有と非共有の区別が難しい。", "複雑さが増す可能性がある。"],
    structure: [
      "オブジェクトの状態を、共有可能な内部状態（intrinsic）と共有不可能な外部状態（extrinsic）に分けます。",
      "FlyweightFactoryがFlyweightオブジェクトの生成と管理（プーリング）を行います。",
      "クライアントはFactoryからFlyweightオブジェクトを取得し、外部状態を渡して使用します。",
    ],
    code: {
      javascript: "/codes/design-pattern/structural/flyweight.ts",
      python: "/codes/design-pattern/structural/flyweight.py",
    },
    icon: <Share2 />,
  },
  proxy: {
    name: "Proxy",
    description:
      "他のオブジェクトへのアクセスを制御するための代理（Proxy）を提供するデザインパターン。遅延初期化（Virtual Proxy）やアクセス制御（Protection Proxy）、ロギングなど、様々な目的で利用される。",
    example:
      "クレジットカードに似ており、銀行口座（Real Subject）への直接アクセスをせずに、支払いを代行し、その際にセキュリティチェックなどを行います。",
    pros: [
      "オブジェクトへのアクセスを制御できる。",
      "追加の処理を透過的に挿入できる。",
    ],
    cons: ["応答時間が遅くなる可能性がある。", "複雑さが増す可能性がある。"],
    structure: [
      "Proxyクラスが、本体（Real Subject）と同じインターフェースを実装します。",
      "ProxyはReal Subjectへの参照を保持します。",
      "クライアントからの要求をProxyが受け取り、必要に応じてReal Subjectに処理を委譲します。",
    ],
    code: {
      javascript: "/codes/design-pattern/structural/proxy.ts",
      python: "/codes/design-pattern/structural/proxy.py",
    },
    icon: <Shield />,
  },
  "chain-of-responsibility": {
    name: "Chain of Responsibility",
    description:
      "要求を処理するオブジェクトのチェーンを構築し、要求をそのチェーンに沿って渡すデザインパターン。",
    example:
      "社内の承認プロセスに似ており、申請が上司、部長、社長へと順に回覧されます。",
    pros: [
      "送信者と受信者の結合度を低く保てる。",
      "処理の順序を柔軟に変更できる。",
    ],
    cons: ["要求が処理されない可能性がある。", "デバッグが難しい場合がある。"],
    structure: [
      "Handlerインターフェースが、要求を処理するメソッドと次のHandlerへの参照を定義します。",
      "ConcreteHandlerは具体的な処理を行い、自身で処理できない場合は次のHandlerに要求を渡します。",
    ],
    code: {
      javascript: "/codes/design-pattern/behavioral/chainOfResponsibility.ts",
      python: "/codes/design-pattern/behavioral/chainOfResponsibility.py",
    },
    icon: <Workflow />,
  },
  command: {
    name: "Command",
    description:
      "要求をオブジェクトとしてカプセル化し、パラメータ化、キューイング、ロギング、取り消しなどの操作を可能にするデザインパターン。",
    example:
      "レストランの注文に似ており、ウェイターが注文（Command）をメモし、厨房（Receiver）に渡します。",
    pros: [
      "操作の取り消しや再実行が容易になる。",
      "操作のログ記録が可能になる。",
      "操作の実行者と操作自体を分離できる。",
    ],
    cons: ["クラス数が多くなる可能性がある。"],
    structure: [
      "Commandインターフェースが実行メソッド（execute）を定義します。",
      "ConcreteCommandが、操作の受け手（Receiver）への参照を持ち、executeメソッドでReceiverの操作を呼び出します。",
      "起動者（Invoker）がCommandオブジェクトを保持し、そのexecuteメソッドを呼び出します。",
    ],
    code: {
      javascript: "/codes/design-pattern/behavioral/command.ts",
      python: "/codes/design-pattern/behavioral/command.py",
    },
    icon: <ClipboardCheck />,
  },
  iterator: {
    name: "Iterator",
    description:
      "コレクションの内部表現を公開せずに、その要素に順次アクセスする手段を提供するデザインパターン。",
    example:
      "テレビのリモコンに似ており、内部構造を知らなくても順番にチャンネルを切り替えられます。",
    pros: [
      "コレクションの内部構造を隠蔽できる。",
      "異なるコレクションに対して統一された走査方法を提供できる。",
    ],
    cons: ["シンプルなコレクションではオーバーヘッドになる可能性がある。"],
    structure: [
      "Iteratorインターフェースが、要素へのアクセス（next）と次の要素の有無（hasNext）を定義します。",
      "Aggregateインターフェースが、Iteratorを作成するメソッドを定義します。",
      "ConcreteIteratorが特定のコレクションの走査ロジックを実装します。",
    ],
    code: {
      javascript: "/codes/design-pattern/behavioral/iterator.ts",
      python: "/codes/design-pattern/behavioral/iterator.py",
    },
    icon: <ScrollText />,
  },
  mediator: {
    name: "Mediator",
    description:
      "オブジェクト間の相互作用をカプセル化するオブジェクトを定義するデザインパターン。",
    example:
      "航空管制官に似ており、各飛行機（Colleague）は管制官（Mediator）を介して通信することで、複雑な依存関係を減らします。",
    pros: [
      "オブジェクト間の結合度を低く保てる。",
      "オブジェクト間の通信ロジックを一元管理できる。",
    ],
    cons: ["Mediatorが巨大になり、複雑になる可能性がある。"],
    structure: [
      "Mediatorインターフェースが、Colleagueオブジェクト間の通信メソッドを定義します。",
      "ConcreteMediatorが具体的な通信ロジックを実装します。",
      "各ColleagueはMediatorへの参照を持ち、他のColleagueとはMediatorを介して通信します。",
    ],
    code: {
      javascript: "/codes/design-pattern/behavioral/mediator.ts",
      python: "/codes/design-pattern/behavioral/mediator.py",
    },
    icon: <TowerControl />,
  },
  memento: {
    name: "Memento",
    description:
      "オブジェクトの内部状態を外部に公開せずに保存し、後でその状態に復元できるようにするデザインパターン。",
    example:
      "ゲームのセーブ機能に似ており、「元に戻す」機能や履歴管理を実装するために使用されます。",
    pros: [
      "オブジェクトのカプセル化を維持できる。",
      "Undo/Redo機能の実装が容易になる。",
    ],
    cons: [
      "Mementoが大量に生成されるとメモリを消費する。",
      "状態の保存・復元が複雑になる場合がある。",
    ],
    structure: [
      "Originatorが、自身の状態を保存したMementoオブジェクトを生成します。",
      "Caretakerが、Mementoオブジェクトを管理（保存）しますが、その中身にはアクセスしません。",
      "Originatorは、Caretakerから渡されたMementoを使って自身の状態を復元します。",
    ],
    code: {
      javascript: "/codes/design-pattern/behavioral/memento.ts",
      python: "/codes/design-pattern/behavioral/memento.py",
    },
    icon: <History />,
  },
  observer: {
    name: "Observer",
    description:
      "オブジェクトの状態変化を、依存する他のオブジェクトに自動的に通知して更新するデザインパターン。",
    example:
      "雑誌の定期購読に似ており、出版社（Subject）が新しい号を発行すると、読者（Observer）に自動的に通知が届きます。",
    pros: [
      "SubjectとObserverの間の結合度を低く保てる。",
      "動的にObserverを追加・削除できる。",
    ],
    cons: [
      "通知の順序が保証されない。",
      "意図しないカスケード更新が発生する可能性がある。",
      "**Observerを解放し忘れるとメモリリークの原因になる。**",
    ],
    structure: [
      "Subject（観測対象）は、Observer（観測者）のリストを保持します。",
      "Subjectは、Observerを追加・削除するためのメソッドを提供します。",
      "Subjectの状態が変化したとき、リスト内のすべてのObserverに通知（notify）メソッドを呼び出します。",
    ],
    code: {
      javascript: "/codes/design-pattern/behavioral/observer.ts",
      python: "/codes/design-pattern/behavioral/observer.py",
    },
    icon: <Rss />,
  },
  state: {
    name: "State",
    description:
      "オブジェクトの内部状態に応じてその振る舞いを変更できるようにするデザインパターン。オブジェクトは、あたかもクラスが変更されたかのように見えます。Stateパターンは「何であるか」に焦点を当てる。",
    example:
      "信号機に似ており、「赤」「黄」「青」の状態に応じて振る舞いが変わります。",
    pros: [
      "状態ごとの振る舞いを明確に分離できる。",
      "状態遷移ロジックを一元管理できる。",
      "if-else文が減り、コードがすっきりする。",
    ],
    cons: ["クラス数が多くなる可能性がある。"],
    structure: [
      "Contextクラスが、現在の状態を表すStateオブジェクトへの参照を持ちます。",
      "クライアントからの要求を、Contextが現在のStateオブジェクトに委譲します。",
      "各ConcreteStateが、その状態における具体的な振る舞いを実装し、次の状態への遷移を管理します。",
    ],
    code: {
      javascript: "/codes/design-pattern/behavioral/state.ts",
      python: "/codes/design-pattern/behavioral/state.py",
    },
    icon: <ToggleLeft />,
  },
  strategy: {
    name: "Strategy",
    description:
      "アルゴリズムのファミリーを定義し、それぞれをカプセル化して、動的に切り替えられるようにするデザインパターン。Strategyパターンは「どのように振る舞うか」に焦点を当てる。",
    example:
      "交通手段の選択に似ており、目的地に行くという目的は同じでも、状況に応じて徒歩、自転車、電車といった手段を切り替えられます。",
    pros: [
      "アルゴリズムの追加や変更が容易になる。",
      "if-else文が減り、コードがすっきりする。",
    ],
    cons: [
      "クラス数が多くなる。",
      "クライアントが各Strategyの違いを理解している必要がある。",
      "すべてのアルゴリズムが同じインターフェースを共有する必要がある。",
    ],
    structure: [
      "共通のインターフェース（Strategy）を定義します。",
      "具体的なアルゴリズムを、それぞれがStrategyインターフェースを実装した具象クラスとして定義します。",
      "ContextクラスがStrategyのインスタンスを保持し、クライアントはContextを介してアルゴリズムを実行します。",
    ],
    code: {
      javascript: "/codes/design-pattern/behavioral/strategy.ts",
      python: "/codes/design-pattern/behavioral/strategy.py",
    },
    icon: <Route />,
  },
  "template-method": {
    name: "Template Method",
    description:
      "アルゴリズムの骨格を定義し、具体的な処理の一部をサブクラスに任せるデザインパターン。",
    example:
      "料理のレシピに似ており、カレーを作るという手順は決まっていますが、具材や辛さといった部分は自由に決めることができます。",
    pros: [
      "コードの重複を排除できる。",
      "アルゴリズムの骨格を固定し、サブクラスでの実装を強制できる。",
    ],
    cons: ["サブクラスの振る舞いがスーパークラスによって制限される。"],
    structure: [
      "抽象クラス（AbstractClass）で、アルゴリズムの骨格となるメソッド（Template Method）を定義します。",
      "Template Method内で、サブクラスで実装されるべき抽象ステップを呼び出します。",
      "具象クラス（ConcreteClass）が、それらの抽象ステップを具体的に実装します。",
    ],
    code: {
      javascript: "/codes/design-pattern/behavioral/templateMethod.ts",
      python: "/codes/design-pattern/behavioral/templateMethod.py",
    },
    icon: <LayoutTemplate />,
  },
  visitor: {
    name: "Visitor",
    description:
      "オブジェクト構造の要素に対して実行される操作を、その要素のクラスを変更せずに定義するデザインパターン。",
    example:
      "税務調査官に似ており、調査官（Visitor）が様々な企業（Element）を訪問し、それぞれの企業に対して異なる調査（Operation）を行います。",
    pros: [
      "既存のクラスを変更せずに新しい操作を追加できる。",
      "関連する操作をVisitorクラスに一元化できる。",
    ],
    cons: [
      "新しいConcreteElementを追加するのが難しい。",
      "Visitorがオブジェクト構造の内部にアクセスする必要があるため、カプセル化が破られる可能性がある。",
    ],
    structure: [
      "Visitorインターフェースが、訪問対象の各クラスに対応するvisitメソッドを定義します。",
      "Elementインターフェースが、Visitorを受け入れるためのacceptメソッドを定義します。",
      "各ConcreteElementはacceptメソッドを実装し、自身のクラスに対応するvisitメソッドを呼び出します。",
    ],
    code: {
      javascript: "/codes/design-pattern/behavioral/visitor.ts",
      python: "/codes/design-pattern/behavioral/visitor.py",
    },
    icon: <Footprints />,
  },
  interpreter: {
    name: "Interpreter",
    description:
      "特定の言語の文法を表現するための文法表現と、その文法に従って文を解釈するためのインタープリタを提供するデザインパターン。",
    example:
      "音楽の楽譜と演奏者に似ており、演奏者（Interpreter）が楽譜（AST）を解釈して演奏します。",
    pros: ["文法をクラス階層で表現できる。", "文法の変更や拡張が容易になる。"],
    cons: ["複雑な文法には向かない。", "クラス数が多くなる可能性がある。"],
    structure: [
      "AbstractExpressionインターフェースが、解釈（interpret）メソッドを定義します。",
      "終端記号（TerminalExpression）と非終端記号（NonterminalExpression）が、AbstractExpressionを実装します。",
      "Contextが、解釈に必要なグローバル情報を提供します。",
    ],
    code: {
      javascript: "/codes/design-pattern/behavioral/interpreter.ts",
      python: "/codes/design-pattern/behavioral/interpreter.py",
    },
    icon: <BookOpenCheck />,
  },
};
