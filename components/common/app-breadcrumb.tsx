"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AppBreadcrumb() {
  const pathname = usePathname();

  // パスを分割してパンくずリストを作成
  const pathSegments = pathname.split("/").filter(Boolean);

  // パス名を日本語に変換するマッピング
  const pathNameMap: { [key: string]: string } = {
    sort: "ソートアルゴリズム",
    "design-pattern": "デザインパターン",
    ml: "機械学習",
    "bubble-sort": "バブルソート",
    "selection-sort": "選択ソート",
    "insertion-sort": "挿入ソート",
    "merge-sort": "マージソート",
    "quick-sort": "クイックソート",
    "heap-sort": "ヒープソート",
    "counting-sort": "カウントソート",
    "radix-sort": "基数ソート",
    "bucket-sort": "バケットソート",
    "tim-sort": "ティムソート",
    "intro-sort": "イントロソート",
    "shell-sort": "シェルソート",
    "bogo-sort": "ボゴソート",
    singleton: "Singleton",
    "factory-method": "Factory Method",
    "abstract-factory": "Abstract Factory",
    builder: "Builder",
    prototype: "Prototype",
    adapter: "Adapter",
    bridge: "Bridge",
    composite: "Composite",
    decorator: "Decorator",
    facade: "Facade",
    flyweight: "Flyweight",
    proxy: "Proxy",
    "chain-of-responsibility": "Chain of Responsibility",
    command: "Command",
    iterator: "Iterator",
    mediator: "Mediator",
    memento: "Memento",
    observer: "Observer",
    state: "State",
    strategy: "Strategy",
    "template-method": "Template Method",
    visitor: "Visitor",
    interpreter: "Interpreter",
    "linear-regression": "線形回帰",
  };

  // ホームの場合は何も表示しない、または最小限の表示
  if (pathname === "/") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>ホーム</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb className="flex-1 min-w-0">
      <BreadcrumbList className="flex-wrap">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">ホーム</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const displayName = pathNameMap[segment] || segment;

          return (
            <React.Fragment key={`breadcrumb-${index}`}>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="truncate">
                {isLast ? (
                  <BreadcrumbPage className="truncate max-w-[150px]" title={displayName}>
                    {displayName}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href} className="truncate max-w-[120px]" title={displayName}>
                      {displayName}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
