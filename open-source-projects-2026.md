# 🔥 热门实用开源项目收藏清单（2026年8-10月）

> 筛选标准：近两个月活跃/新创、高 Star、跨领域实用、可本地部署  
> 生成时间：2026-10-13

---

## 📋 目录

1. [🤖 AI Agent 与 LLM 工具](#1-ai-agent-与-llm-工具)
2. [🧠 机器学习 / 深度学习](#2-机器学习--深度学习)
3. [💻 软件开发与 DevTools](#3-软件开发与-devtools)
4. [📐 算法与计算机科学](#4-算法与计算机科学)
5. [💰 金融与量化](#5-金融与量化)
6. [📝 科研 / 论文 / 文献检索](#6-科研--论文--文献检索)
7. [🌍 地质与地球科学](#7-地质与地球科学)
8. [⚡ 生产力与通用工具](#8-生产力与通用工具)

---

## 1. 🤖 AI Agent 与 LLM 工具

### 1.1 DeepSeek Harness ⭐ 248k
- **仓库**: [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)
- **语言**: TypeScript | **创建**: 2026-08-13
- **简介**: "万物皆插件"的 AI Agent 框架，DeepSeek 官方出品，插件化生态，桌面端/Web 端均有
- **适用**: AI 应用开发、Agent 编排、插件分发
- **本地部署**:
  ```bash
  npm install -g @deepseek/harness
  dsh init my-project && cd my-project
  dsh dev
  ```

### 1.2 OpenClaw ⭐ 392k
- **仓库**: [openclaw/openclaw](https://github.com/openclaw/openclaw)
- **语言**: TypeScript | **创建**: 2025-11
- **简介**: "真正能做事的 AI"，跨平台个人 AI 助手，支持多种消息渠道、插件、技能
- **适用**: 个人 AI 助手、自动化、多渠道消息
- **本地部署**:
  ```bash
  npm install -g openclaw
  openclaw onboard
  ```

### 1.3 GPT Researcher ⭐ 29k+
- **仓库**: [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher)
- **语言**: Python
- **简介**: 自主深度研究 Agent，自动规划问题→爬取网络→总结来源→生成带引用的报告
- **适用**: 科研调研、文献综述、深度报告写作
- **本地部署**:
  ```bash
  git clone https://github.com/assafelovic/gpt-researcher.git
  cd gpt-researcher && pip install -r requirements.txt
  export OPENAI_API_KEY=xxx
  python -m gpt_researcher --query "你的研究主题"
  ```

### 1.4 Khoj ⭐ 37.7k
- **仓库**: [khoj-ai/khoj](https://github.com/khoj-ai/khoj)
- **语言**: Python
- **简介**: 自托管的 "AI 第二大脑"，可从本地文档/网页获取答案，支持自定义 Agent、定时自动化、深度研究
- **适用**: 个人知识库、RAG、离线 LLM
- **本地部署**:
  ```bash
  pip install khoj-assistant
  khoj --configure
  # 或 Docker
  docker run -p 42110:42110 ghcr.io/khoj-ai/khoj
  ```

### 1.5 Firecrawl ⭐ 191k
- **仓库**: [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)
- **语言**: TypeScript
- **简介**: AI 网页爬虫/数据提取，将网页转为干净 Markdown，专为 AI Agent 设计
- **适用**: 数据采集、网页转 Markdown、RAG 数据准备
- **本地部署**:
  ```bash
  git clone https://github.com/firecrawl/firecrawl.git
  cd firecrawl && docker compose up
  ```

### 1.6 RD-Agent ⭐ 14.9k
- **仓库**: [microsoft/RD-Agent](https://github.com/microsoft/RD-Agent)
- **语言**: Python
- **简介**: 微软出品的研发自动化 Agent，让 AI 驱动数据驱动的 AI 研发（数据挖掘、模型调优）
- **适用**: AI 研发自动化、量化研究、机器学习实验
- **本地部署**:
  ```bash
  pip install rd-agent
  rd-agent bootstrap
  ```

---

## 2. 🧠 机器学习 / 深度学习

### 2.1 Laya ⭐ 32.5k
- **仓库**: [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya)
- **语言**: Python | **创建**: 2026-09-18
- **简介**: 非自回归 System 1 决策引擎，单次前向传播完成文本分类/打分/是-否判断，支持 100+ 语言
- **适用**: 轻量级文本分类、LLM 路由、零样本分类
- **本地部署**:
  ```bash
  pip install laya
  python -c "from laya import Laya; m=Laya(); print(m.classify('文本'))"
  ```

### 2.2 Strata ⭐ 22.6k
- **仓库**: [Niko1221/Strata](https://github.com/Niko1221/Strata)
- **语言**: C++ | **创建**: 2026-09-24
- **简介**: 在消费级硬件上一键运行 Qwen3.8-Flash-Next，提供 OpenAI/Anthropic 兼容 API
- **适用**: 本地大模型推理、自建 LLM API
- **本地部署**:
  ```bash
  # Windows/Linux 一键安装
  # 详见仓库 README，提供本地 OpenAI 兼容 API
  ```

### 2.3 Kev ⭐ 9k
- **仓库**: [jaredpalmer/kev](https://github.com/jaredpalmer/kev)
- **语言**: Python | **创建**: 2026-09-17
- **简介**: 基于 Qwen3.5/3.8 的 Jev 系列决策模型，可自行训练和运行
- **适用**: 决策模型训练、低成本分类
- **本地部署**: `pip install kev`

### 2.4 TensorFlow ⭐ 201k
- **仓库**: [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow)
- **语言**: C++/Python
- **简介**: 谷歌开源机器学习框架，端到端从研究到生产
- **适用**: 深度学习模型训练与部署
- **本地部署**: `pip install tensorflow`

### 2.5 Utopia ⭐ 8.3k
- **仓库**: [deeplethe/utopia](https://github.com/deeplethe/utopia)
- **语言**: Rust | **创建**: 2026-08-07
- **简介**: 首个开源企业级世界模型，基于时序知识图谱 + RAG
- **适用**: 知识库、世界模型、语义搜索
- **本地部署**:
  ```bash
  git clone https://github.com/deeplethe/utopia.git
  cd utopia && cargo build --release
  ```

### 2.6 ARC Task Generator ⭐ 11k
- **仓库**: [pathwaycom/arc-task-gen](https://github.com/pathwaycom/arc-task-gen)
- **语言**: Python | **创建**: 2026-08-04
- **简介**: 生成与 ARC-AGI-1 评测集分布匹配的原创任务
- **适用**: AI 推理能力评测、AGI 研究

---

## 3. 💻 软件开发与 DevTools

### 3.1 n8n ⭐ 207k
- **仓库**: [n8n-io/n8n](https://github.com/n8n-io/n8n)
- **语言**: TypeScript
- **简介**: 公平代码工作流自动化平台，原生 AI 能力，400+ 集成，可自托管
- **适用**: 工作流自动化、AI 编排、API 集成
- **本地部署**:
  ```bash
  docker run -it --rm -p 5678:5678 n8nio/n8n
  # 或 npm install n8n -g && n8n
  ```

### 3.2 markitdown ⭐ 190k
- **仓库**: [microsoft/markitdown](https://github.com/microsoft/markitdown)
- **语言**: Python
- **简介**: 微软出品，将 Word/PPT/Excel/PDF 等办公文档转为 Markdown
- **适用**: 文档处理、RAG 数据准备、论文格式转换
- **本地部署**: `pip install markitdown`

### 3.3 anydoc ⭐ 22.8k
- **仓库**: [firecrawl/anydoc](https://github.com/firecrawl/anydoc)
- **语言**: Rust | **创建**: 2026-08-03
- **简介**: Rust 编写的文档转 Markdown 工具，支持 Word/PPT/Excel/EPUB/CSV/PDF，提供 Node/Python 绑定
- **适用**: 批量文档转换、比 markitdown 更快
- **本地部署**: `pip install anydoc` 或 `npm install anydoc`

### 3.4 Artemis ⭐ 11.4k
- **仓库**: [google/artemis](https://github.com/google/artemis)
- **语言**: Python | **创建**: 2026-08-13
- **简介**: 谷歌出品，将自然语言指令转为可靠的 Android 自动化，AndroidWorld 基准测试 99%+ 成功率
- **适用**: Android 自动化、测试、AI 编码助手集成
- **本地部署**:
  ```bash
  pip install artemis-android
  artemis --instruction "打开设置并开启 WiFi"
  ```

### 3.5 The Algorithms / Python ⭐ 225k
- **仓库**: [TheAlgorithms/Python](https://github.com/TheAlgorithms/Python)
- **语言**: Python
- **简介**: 用 Python 实现的所有算法合集，社区驱动
- **适用**: 算法学习、面试准备、教学

### 3.6 system-design-primer ⭐ 374k
- **仓库**: [donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer)
- **简介**: 学习如何设计大规模系统，含 Anki 闪卡
- **适用**: 系统设计面试、架构学习

---

## 4. 📐 算法与计算机科学

### 4.1 TheAlgorithms/Python ⭐ 225k
- 见上方 3.5

### 4.2 awesome-python ⭐ 327k
- **仓库**: [vinta/awesome-python](https://github.com/vinta/awesome-python)
- **简介**: Python 框架/库/工具精选列表，"我想用 Python 做 X，该用什么工具" 的答案

### 4.3 free-programming-books ⭐ 399k
- **仓库**: [EbookFoundation/free-programming-books](https://github.com/EbookFoundation/free-programming-books)
- **简介**: 免费编程书籍合集

### 4.4 developer-roadmap ⭐ 369k
- **仓库**: [nilbuild/developer-roadmap](https://github.com/nilbuild/developer-roadmap)
- **简介**: 交互式开发者学习路线图（前端/后端/DevOps/AI 等）

---

## 5. 💰 金融与量化

### 5.1 TradingAgents ⭐ 111k
- **仓库**: [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents)
- **语言**: Python
- **简介**: 多 Agent LLM 金融交易框架，多个 AI Agent 协作进行交易决策
- **适用**: 量化交易、AI 金融、多 Agent 系统
- **本地部署**:
  ```bash
  git clone https://github.com/TauricResearch/TradingAgents.git
  cd TradingAgents && pip install -e .
  ```

### 5.2 OpenBB ⭐ 74k
- **仓库**: [openbq-org/OpenBB](https://github.com/openbq-org/OpenBB)
- **语言**: Python
- **简介**: 面向分析师、量化和 AI Agent 的开放数据平台，覆盖股票/加密/期权/固定收益等
- **适用**: 金融数据分析、量化研究
- **本地部署**:
  ```bash
  pip install openbb
  python -c "from openbb import obb; print(obb.equity.price.quote('AAPL'))"
  ```

### 5.3 Qlib ⭐ 49k
- **仓库**: [microsoft/qlib](https://github.com/microsoft/qlib)
- **语言**: Python
- **简介**: 微软 AI 量化投资平台，支持监督学习/市场动态建模/强化学习，集成 RD-Agent
- **适用**: 量化投资、AI 选股、回测
- **本地部署**:
  ```bash
  pip install pyqlib
  python -m qlib.run.all --config examples/benchmarks/LightGBM/workflow_config_lightgbm.yaml
  ```

---

## 6. 📝 科研 / 论文 / 文献检索

### 6.1 GPT Researcher ⭐ 29k+
- 见上方 1.3 — 自动生成带引用的研究报告

### 6.2 zotero-arxiv-daily ⭐ 6k
- **仓库**: [TideDra/zotero-arxiv-daily](https://github.com/TideDra/zotero-arxiv-daily)
- **语言**: Python
- **简介**: 根据你的 Zotero 文献库，每日推荐感兴趣的 arXiv 新论文
- **适用**: 文献追踪、论文发现、学术前沿
- **本地部署**:
  ```bash
  git clone https://github.com/TideDra/zotero-arxiv-daily.git
  cd zotero-arxiv-daily && pip install -r requirements.txt
  python main.py
  ```

### 6.3 Khoj ⭐ 37.7k
- 见上方 1.4 — 可索引本地论文做问答

### 6.4 open-notebook
- **简介**: 解决"资料太多看不过来"的 AI 笔记工具，自动整理和总结阅读材料
- **适用**: 文献管理、阅读笔记、知识管理

### 6.5 Feynman
- **简介**: 开源研究 Agent，搜索学术文献和网络资源，生成带引用的简报，对比论文结论与公开代码
- **适用**: 科研调研、论文复现规划、可审计研究

### 6.6 awesome-open-geoscience
- 见下方 7.1 — 含大量地球科学开源工具

---

## 7. 🌍 地质与地球科学

### 7.1 awesome-open-geoscience ⭐ 1.9k
- **仓库**: [softwareunderground/awesome-open-geoscience](https://github.com/softwareunderground/awesome-open-geoscience)
- **简介**: 地球科学家/黑客/数据工作者的开源工具精选列表（地质/地球物理/地球化学/水文等）
- **适用**: 地质研究、地球科学数据处理
- **使用**: 直接浏览 README 中的分类链接

### 7.2 GemPy ⭐ 1.4k
- **仓库**: [gempy-project/gempy](https://github.com/gempy-project/gempy)
- **语言**: Python
- **简介**: 开源 3D 结构地质建模软件，支持隐式建模和随机建模（不确定性分析）
- **适用**: 3D 地质建模、不确定性分析、蒙特卡洛模拟
- **本地部署**:
  ```bash
  pip install gempy
  ```

---

## 8. ⚡ 生产力与通用工具

### 8.1 yt-dlp ⭐ 197k
- **仓库**: [yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp)
- **语言**: Python
- **简介**: 功能强大的命令行音视频下载器，支持 1000+ 网站
- **本地部署**: `pip install yt-dlp`

### 8.2 HowToLiveBetter ⭐ 61k
- **仓库**: [eternity4719/HowToLiveBetter](https://github.com/eternity4719/HowToLiveBetter)
- **语言**: HTML | **创建**: 2026-09-07
- **简介**: 高性价比人生指南：长寿防病、急救、省钱理财、法律红线、医保社保等，每条标明成本/收益/证据等级/出处
- **适用**: 生活决策参考、实用知识查询

### 8.3 FreeDomain ⭐ 204k
- **仓库**: [DigitalPlatDev/FreeDomain](https://github.com/DigitalPlatDev/FreeDomain)
- **简介**: 免费域名注册与 DNS 学习资源

### 8.4 photocraft / filmcraft / lightcraft / pdfcraft / wordcraft (Rust 全家桶) ⭐ 11k-53k
- **仓库**: [storytold/photocraft](https://github.com/storytold/photocraft) 等
- **语言**: Rust | **创建**: 2026-09-30
- **简介**: 用纯 Rust 从零编写的开源图片/视频/RAW/PDF/Word 编辑器
- **适用**: 本地化创意工具、Rust 学习

### 8.5 moli ⭐ 17k
- **仓库**: [lexmount/moli](https://github.com/lexmount/moli)
- **语言**: Rust | **创建**: 2026-08-10
- **简介**: 为 AI Agent 打造的轻量无头浏览器，Rust 编写
- **适用**: 浏览器自动化、AI Agent、爬虫

### 8.6 jev-ultrafast ⭐ 22.7k
- **仓库**: [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast)
- **语言**: Python | **创建**: 2026-09-16
- **简介**: 最快最便宜的 Web Agent
- **适用**: 浏览器自动化 Agent

---

## 🚀 快速收藏指南

### 一键 Star 收藏（推荐）
访问每个仓库右上角点击 ⭐ Star，或用 GitHub CLI 批量：
```bash
# 安装 gh 后批量 star
gh repo star deepseek-ai/deepseek-harness
gh repo star openclaw/openclaw
gh repo star assafelovic/gpt-researcher
gh repo star khoj-ai/khoj
gh repo star TauricResearch/TradingAgents
gh repo star microsoft/qlib
gh repo star TideDra/zotero-arxiv-daily
gh repo star gempy-project/gempy
```

### 本地部署速查表
| 项目 | 安装命令 |
|------|----------|
| DeepSeek Harness | `npm i -g @deepseek/harness` |
| OpenClaw | `npm i -g openclaw` |
| GPT Researcher | `git clone && pip install -r requirements.txt` |
| Khoj | `pip install khoj-assistant` 或 Docker |
| n8n | `docker run -p 5678:5678 n8nio/n8n` |
| markitdown | `pip install markitdown` |
| OpenBB | `pip install openbb` |
| Qlib | `pip install pyqlib` |
| yt-dlp | `pip install yt-dlp` |
| GemPy | `pip install gempy` |

### 重点推荐（按你的需求）
| 需求 | 首选项目 |
|------|----------|
| 论文写作/文献综述 | **GPT Researcher** + **zotero-arxiv-daily** |
| 文献检索/管理 | **Khoj**（本地论文问答） |
| 机器学习/深度学习 | **Laya**（轻量分类）+ **TensorFlow** |
| 金融量化 | **Qlib** + **OpenBB** + **TradingAgents** |
| 软件开发效率 | **n8n** + **markitdown** + **firecrawl** |
| 算法学习 | **TheAlgorithms/Python** + **system-design-primer** |
| 地质建模 | **GemPy** + **awesome-open-geoscience** |
| AI Agent 开发 | **DeepSeek Harness** + **OpenClaw** |

---

*数据来源：GitHub Search API (2026-10-13)，筛选条件：近两月活跃或新创、高 Star、跨领域实用*
