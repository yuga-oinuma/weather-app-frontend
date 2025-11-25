import React from "react";
import {
  CloudIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import PageSection from "../components/layout/PageSection";
import PageTitle from "../components/layout/PageTitle";
import { FaReact, FaServer } from "react-icons/fa";

const IconReact = FaReact as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const IconServer = FaServer as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;

const About: React.FC = () => {
  return (
    <PageSection>
      <div className="max-w-4xl mx-auto px-4 pb-10">
        {/* タイトル */}
        <PageTitle title="このアプリについて" />
        <p className="text-center text-gray-600 leading-relaxed">
          <span className="block sm:inline">日本の主要都市の気象データを</span>
          <span className="block sm:inline">比較・分析するWebアプリです。</span>
        </p>
        <p className="text-center text-gray-600 mb-10 leading-relaxed">
          <span className="block sm:inline">日次・週次レポートや</span>
          <span className="block sm:inline">ランキング、グラフ表示などの</span>
          <span className="block sm:inline sm:ml-1">機能を提供します。</span>
        </p>

        {/* 特徴セクション */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* カード1 */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
            <CloudIcon className="h-10 w-10 text-blue-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">気象データ表示</h3>
            <p className="text-gray-500 text-sm">
              OpenWeather APIから取得したデータを表示します。
            </p>
          </div>

          {/* カード2 */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
            <ChartBarIcon className="h-10 w-10 text-green-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">グラフ & ランキング</h3>
            <p className="text-gray-500 text-sm">
              Rechartsを使ったグラフやランキングを表示します。
            </p>
          </div>

          {/* カード3 */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
            <DevicePhoneMobileIcon className="h-10 w-10 text-purple-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">レスポンシブ対応</h3>
            <p className="text-gray-500 text-sm">
              TailwindでスマホからPCまで快適に閲覧できます。
            </p>
          </div>
        </div>

        {/* GitHubリンク */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-8 text-center">ソースコード</h2>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 text-center">
            {/* フロントエンド */}
            <a
              href="https://github.com/yuga-oinuma/weather-app-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white border border-gray-300 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <IconReact className="mx-auto text-blue-500 text-4xl mb-2" />
              <h3 className="text-lg font-bold text-blue-600 mb-2">
                フロントエンド
              </h3>
              <p className="text-gray-600 text-sm">
                React + Tailwindで構築されたUI
              </p>
              <p className="mt-2 text-blue-500 font-medium hover:underline">
                GitHubリポジトリ →
              </p>
            </a>

            {/* バックエンド */}
            <a
              href="https://github.com/yuga-oinuma/weather-app-backend"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white border border-gray-300 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <IconServer className="mx-auto text-green-500 text-4xl mb-2" />
              <h3 className="text-lg font-bold text-green-600 mb-2">
                バックエンド
              </h3>
              <p className="text-gray-600 text-sm">AWS SAMを利用したAPI</p>
              <p className="mt-2 text-green-500 font-medium hover:underline">
                GitHubリポジトリ →
              </p>
            </a>
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default About;
