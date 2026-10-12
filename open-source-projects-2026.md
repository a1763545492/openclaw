# 🔥 热门实用开源项目收藏清单（含详细部署指南）

> 筛选标准：近两个月活跃/新创、高 Star、跨领域实用、可本地部署  
> 生成时间：2026-10-13  
> 覆盖领域：AI/LLM、机器学习、软件开发、算法、金融量化、科研论文、地质、生产力

---

## 📋 目录

- [前置依赖准备](#前置依赖准备)
- [1. 🤖 AI Agent 与 LLM 工具](#1-ai-agent-与-llm-工具)
- [2. 🧠 机器学习 / 深度学习](#2-机器学习--深度学习)
- [3. 💻 软件开发与 DevTools](#3-软件开发与-devtools)
- [4. 📐 算法与计算机科学](#4-算法与计算机科学)
- [5. 💰 金融与量化](#5-金融与量化)
- [6. 📝 科研 / 论文 / 文献检索](#6-科研--论文--文献检索)
- [7. 🌍 地质与地球科学](#7-地质与地球科学)
- [8. ⚡ 生产力与通用工具](#8-生产力与通用工具)
- [快速部署速查表](#快速部署速查表)
- [收藏与 Star 指南](#收藏与-star-指南)

---

## 前置依赖准备

部署前确保安装以下基础工具：

| 工具 | 安装命令 | 用途 |
|------|---------|------|
| Python 3.10+ | `python3 --version` | Python 项目运行 |
| Node.js 18+ | `node --version` | JS/TS 项目运行 |
| Git | `git --version` | 克隆仓库 |
| pip | `pip --version` | Python 包管理 |
| npm | `npm --version` | JS 包管理 |
| Docker | `docker --version` | 容器化部署（推荐） |

**验证环境**:
```bash
python3 --version && node --version && git --version && docker --version
```

---

## 1. 🤖 AI Agent 与 LLM 工具

### 1.1 DeepSeek Harness ⭐ 248k
- **仓库**: [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)
- **语言**: TypeScript | **创建**: 2026-08-13
- **简介**: "万物皆插件"的 AI Agent 框架，DeepSeek 官方出品，插件化生态
- **适用**: AI 应用开发、Agent 编排、插件分发
- **前置依赖**: Node.js 18+, npm

**分步部署**:
```bash
# 1. 全局安装
npm install -g @deepseek/harness

# 2. 验证安装
dsh --version

# 3. 初始化项目
dsh init my-agent-project
cd my-agent-project

# 4. 安装依赖
npm install

# 5. 启动开发服务
dsh dev
# 访问 http://localhost:3000
```

**常见问题**:
- 端口占用: `dsh dev --port 3001`
- 权限问题: 加 `sudo` 或使用 nvm 管理 Node

---

### 1.2 OpenClaw ⭐ 392k
- **仓库**: [openclaw/openclaw](https://github.com/openclaw/openclaw)
- **语言**: TypeScript | **创建**: 2025-11
- **简介**: 跨平台个人 AI 助手，支持多消息渠道、插件、技能
- **适用**: 个人 AI 助手、自动化、多渠道消息
- **前置依赖**: Node.js 22+, pnpm

**分步部署**:
```bash
# 1. 全局安装
npm install -g openclaw

# 2. 验证
openclaw --version

# 3. 运行引导配置（设置 API Key、渠道等）
openclaw onboard

# 4. 启动网关
openclaw gateway run --bind loopback --port 18789

# 5. 另开终端，运行本地 Agent
openclaw agent --local
```

**Docker 部署**:
```bash
docker run -d -p 18789:18789 \
  -v ~/.openclaw:/root/.openclaw \
  --name openclaw \
  openclaw/openclaw:latest
```

---

### 1.3 GPT Researcher ⭐ 29k+
- **仓库**: [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher)
- **语言**: Python
- **简介**: 自主深度研究 Agent，自动规划→爬取→总结→生成带引用报告
- **适用**: 科研调研、文献综述、深度报告写作
- **前置依赖**: Python 3.11+, OpenAI API Key

**分步部署**:
```bash
# 1. 克隆仓库
git clone https://github.com/assafelovic/gpt-researcher.git
cd gpt-researcher

# 2. 创建虚拟环境（推荐）
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. 安装依赖
pip install -r requirements.txt

# 4. 配置环境变量
cp .env.example .env
# 编辑 .env，填入 OPENAI_API_KEY=sk-xxx

# 5. 命令行使用
python -m gpt_researcher --query "量子计算最新进展" --report_type research_report

# 6. Web UI 模式
python -m gpt_researcher --mode web
# 访问 http://localhost:8000
```

**验证**:
```bash
python -c "from gpt_researcher import GPTResearcher; print('OK')"
```

---

### 1.4 Khoj ⭐ 37.7k
- **仓库**: [khoj-ai/khoj](https://github.com/khoj-ai/khoj)
- **语言**: Python
- **简介**: 自托管 "AI 第二大脑"，从本地文档/网页获取答案
- **适用**: 个人知识库、RAG、离线 LLM
- **前置依赖**: Python 3.10+ 或 Docker

**分步部署（pip 方式）**:
```bash
# 1. 安装
pip install khoj-assistant

# 2. 首次配置
khoj --configure
# 按提示设置 LLM Provider、API Key 等

# 3. 启动服务
khoj
# 访问 http://localhost:42110

# 4. 添加文档（在 Web UI 中上传，或命令行）
khoj --index /path/to/your/papers
```

**Docker 部署（推荐）**:
```bash
docker run -d \
  -p 42110:42110 \
  -v ~/.khoj:/root/.khoj \
  -v ~/documents:/root/documents \
  --name khoj \
  ghcr.io/khoj-ai/khoj:latest
```

---

### 1.5 Firecrawl ⭐ 191k
- **仓库**: [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)
- **语言**: TypeScript
- **简介**: AI 网页爬虫/数据提取，网页转干净 Markdown
- **适用**: 数据采集、RAG 数据准备
- **前置依赖**: Docker + Docker Compose

**分步部署**:
```bash
# 1. 克隆
git clone https://github.com/firecrawl/firecrawl.git
cd firecrawl

# 2. 配置
cp .env.example .env
# 编辑 .env 设置 REDIS_URL、API 密钥等

# 3. 启动所有服务
docker compose up -d

# 4. 验证 API
curl -X POST http://localhost:3002/v1/scrape \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

**轻量替代**: 使用 SDK 调用官方 API
```bash
pip install firecrawl-py
```

---

### 1.6 RD-Agent ⭐ 14.9k
- **仓库**: [microsoft/RD-Agent](https://github.com/microsoft/RD-Agent)
- **语言**: Python
- **简介**: 微软研发自动化 Agent，AI 驱动数据驱动的 AI 研发
- **适用**: AI 研发自动化、量化研究、ML 实验
- **前置依赖**: Python 3.10+

**分步部署**:
```bash
# 1. 克隆
git clone https://github.com/microsoft/RD-Agent.git
cd RD-Agent

# 2. 安装
pip install rd-agent

# 3. 引导配置
rd-agent bootstrap

# 4. 运行研发任务
rd-agent run --task "优化股票预测模型"
```

---

## 2. 🧠 机器学习 / 深度学习

### 2.1 Laya ⭐ 32.5k
- **仓库**: [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya)
- **语言**: Python | **创建**: 2026-09-18
- **简介**: 非自回归 System 1 决策引擎，单次前向传播完成文本分类/打分/是-否判断，100+ 语言
- **适用**: 轻量级文本分类、LLM 路由、零样本分类
- **前置依赖**: Python 3.9+, PyTorch

**分步部署**:
```bash
# 1. 安装
pip install laya

# 2. 验证（首次会自动下载模型）
python -c "
from laya import Laya
m = Laya()
result = m.classify('这款手机性价比很高', labels=['正面', '负面', '中性'])
print(result)
"
```

**使用示例**:
```python
from laya import Laya

m = Laya()
# 是/否判断
print(m.yesno("这个产品值得购买吗？"))
# 打分
print(m.score("这篇论文的创新性如何？"))
```

---

### 2.2 Strata ⭐ 22.6k
- **仓库**: [Niko1221/Strata](https://github.com/Niko1221/Strata)
- **语言**: C++ | **创建**: 2026-09-24
- **简介**: 消费级硬件一键运行 Qwen3.8-Flash-Next，提供 OpenAI/Anthropic 兼容 API
- **适用**: 本地大模型推理、自建 LLM API
- **前置依赖**: Windows 或 Linux，至少 8GB 显存（或 CPU 模式）

**分步部署**:
```bash
# 1. 克隆
git clone https://github.com/Niko1221/Strata.git
cd Strata

# 2. Linux 一键安装
chmod +x install.sh && ./install.sh

# 3. 启动推理服务
./strata --model qwen3.8-flash --port 8080

# 4. 验证 OpenAI 兼容 API
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"qwen","messages":[{"role":"user","content":"你好"}]}'
```

---

### 2.3 TensorFlow ⭐ 201k
- **仓库**: [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow)
- **语言**: C++/Python
- **简介**: 谷歌开源 ML 框架，端到端从研究到生产
- **前置依赖**: Python 3.9-3.12

**分步部署**:
```bash
# CPU 版本
pip install tensorflow

# GPU 版本（需要 CUDA）
pip install tensorflow[and-cuda]

# 验证
python -c "import tensorflow as tf; print(tf.__version__)"
```

---

### 2.4 Utopia ⭐ 8.3k
- **仓库**: [deeplethe/utopia](https://github.com/deeplethe/utopia)
- **语言**: Rust | **创建**: 2026-08-07
- **简介**: 首个开源企业级世界模型，时序知识图谱 + RAG
- **前置依赖**: Rust 1.75+, PostgreSQL + pgvector

**分步部署**:
```bash
# 1. 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 2. 启动 PostgreSQL + pgvector
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=pass \
  pgvector/pgvector:pg16

# 3. 克隆并构建
git clone https://github.com/deeplethe/utopia.git
cd utopia
cargo build --release

# 4. 配置 .env 并启动
cp .env.example .env
./target/release/utopia
```

---

### 2.5 Kev ⭐ 9k
- **仓库**: [jaredpalmer/kev](https://github.com/jaredpalmer/kev)
- **语言**: Python | **创建**: 2026-09-17
- **简介**: 基于 Qwen3.5/3.8 的决策模型，可自行训练和运行
- **分步部署**:
```bash
pip install kev
python -c "from kev import Kev; print(Kev().classify('文本'))"
```

---

## 3. 💻 软件开发与 DevTools

### 3.1 n8n ⭐ 207k
- **仓库**: [n8n-io/n8n](https://github.com/n8n-io/n8n)
- **语言**: TypeScript
- **简介**: 工作流自动化平台，原生 AI 能力，400+ 集成，可自托管
- **适用**: 工作流自动化、AI 编排、API 集成
- **前置依赖**: Docker（推荐）或 Node.js 18+

**Docker 部署（推荐）**:
```bash
# 1. 创建数据目录
mkdir -p ~/.n8n

# 2. 启动
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# 3. 访问
# 打开 http://localhost:5678
```

**npm 部署**:
```bash
npm install n8n -g
n8n
```

**验证**: `curl http://localhost:5678/healthz`

---

### 3.2 markitdown ⭐ 190k
- **仓库**: [microsoft/markitdown](https://github.com/microsoft/markitdown)
- **语言**: Python
- **简介**: 微软出品，Word/PPT/Excel/PDF 等转 Markdown
- **适用**: 文档处理、RAG 数据准备、论文格式转换
- **前置依赖**: Python 3.9+

**分步部署**:
```bash
# 1. 安装
pip install markitdown

# 2. 命令行使用
markitdown paper.pdf > paper.md
markitdown report.docx > report.md

# 3. Python 调用
python -c "
from markitdown import MarkItDown
md = MarkItDown()
result = md.convert('document.pdf')
print(result.text_content)
"
```

**验证**: `markitdown --version`

---

### 3.3 anydoc ⭐ 22.8k
- **仓库**: [firecrawl/anydoc](https://github.com/firecrawl/anydoc)
- **语言**: Rust | **创建**: 2026-08-03
- **简介**: Rust 编写的文档转 Markdown，比 markitdown 更快，支持更多格式
- **分步部署**:
```bash
# Python
pip install anydoc

# Node.js
npm install anydoc

# 使用
python -c "import anydoc; print(anydoc.convert('file.pdf'))"
```

---

### 3.4 Artemis ⭐ 11.4k
- **仓库**: [google/artemis](https://github.com/google/artemis)
- **语言**: Python | **创建**: 2026-08-13
- **简介**: 谷歌出品，自然语言转 Android 自动化，99%+ 成功率
- **前置依赖**: Python 3.10+, Android SDK, ADB

**分步部署**:
```bash
# 1. 安装
pip install artemis-android

# 2. 连接 Android 设备（开启 USB 调试）
adb devices

# 3. 运行自动化
artemis --instruction "打开设置，开启 WiFi，然后打开相机"

# 4. 录制脚本
artemis record --output script.json
```

---

### 3.5 The Algorithms / Python ⭐ 225k
- **仓库**: [TheAlgorithms/Python](https://github.com/TheAlgorithms/Python)
- **简介**: Python 实现的所有算法合集
- **本地收藏**:
```bash
git clone https://github.com/TheAlgorithms/Python.git ~/algorithms-python
```

---

## 4. 📐 算法与计算机科学

### 4.1 system-design-primer ⭐ 374k
- **仓库**: [donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer)
- **简介**: 学习大规模系统设计，含 Anki 闪卡
- **本地收藏**:
```bash
git clone https://github.com/donnemartin/system-design-primer.git ~/system-design
```

### 4.2 awesome-python ⭐ 327k
- **仓库**: [vinta/awesome-python](https://github.com/vinta/awesome-python)
- **简介**: Python 框架/库/工具精选列表
- **本地收藏**: `git clone https://github.com/vinta/awesome-python.git`

### 4.3 developer-roadmap ⭐ 369k
- **仓库**: [nilbuild/developer-roadmap](https://github.com/nilbuild/developer-roadmap)
- **简介**: 交互式开发者学习路线图
- **本地部署**:
```bash
git clone https://github.com/nilbuild/developer-roadmap.git
cd developer-roadmap && npm install && npm run dev
```

### 4.4 free-programming-books ⭐ 399k
- **仓库**: [EbookFoundation/free-programming-books](https://github.com/EbookFoundation/free-programming-books)
- **简介**: 免费编程书籍合集
- **本地收藏**: `git clone https://github.com/EbookFoundation/free-programming-books.git`

---

## 5. 💰 金融与量化

### 5.1 Qlib ⭐ 49k
- **仓库**: [microsoft/qlib](https://github.com/microsoft/qlib)
- **语言**: Python
- **简介**: 微软 AI 量化投资平台，支持监督学习/市场动态建模/RL
- **适用**: 量化投资、AI 选股、回测
- **前置依赖**: Python 3.8+, Redis（可选）

**分步部署**:
```bash
# 1. 安装
pip install pyqlib

# 2. 下载数据（中国A股为例）
python -m qlib.run.get_data qlib_data --target_dir ~/.qlib/qlib_data/cn_data --region cn

# 3. 运行示例回测
python -m qlib.run.all --config \
  examples/benchmarks/LightGBM/workflow_config_lightgbm.yaml

# 4. 启动 Web 界面（可视化）
pip install streamlit
streamlit run examples/streamlit/app.py
```

**验证**:
```bash
python -c "import qlib; qlib.init(); print('Qlib OK')"
```

---

### 5.2 OpenBB ⭐ 74k
- **仓库**: [openbq-org/OpenBB](https://github.com/openbq-org/OpenBB)
- **语言**: Python
- **简介**: 开放金融数据平台，覆盖股票/加密/期权/固定收益
- **适用**: 金融数据分析、量化研究
- **前置依赖**: Python 3.10+

**分步部署**:
```bash
# 1. 安装
pip install openbb

# 2. Python API 使用
python -c "
from openbb import obb
# 获取苹果股价
df = obb.equity.price.quote('AAPL')
print(df.to_dataframe())
"

# 3. 启动终端界面
openbb
```

---

### 5.3 TradingAgents ⭐ 111k
- **仓库**: [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents)
- **语言**: Python
- **简介**: 多 Agent LLM 金融交易框架
- **前置依赖**: Python 3.11+, OpenAI API Key

**分步部署**:
```bash
# 1. 克隆
git clone https://github.com/TauricResearch/TradingAgents.git
cd TradingAgents

# 2. 安装
pip install -e .

# 3. 配置
cp .env.example .env
# 填入 API Key

# 4. 运行交易模拟
python -m trading_agents --mode simulation --ticker AAPL
```

---

## 6. 📝 科研 / 论文 / 文献检索

### 6.1 zotero-arxiv-daily ⭐ 6k
- **仓库**: [TideDra/zotero-arxiv-daily](https://github.com/TideDra/zotero-arxiv-daily)
- **语言**: Python
- **简介**: 根据 Zotero 文献库，每日推荐感兴趣的 arXiv 新论文
- **适用**: 文献追踪、论文发现
- **前置依赖**: Python 3.9+, Zotero API Key

**分步部署**:
```bash
# 1. 克隆
git clone https://github.com/TideDra/zotero-arxiv-daily.git
cd zotero-arxiv-daily

# 2. 安装依赖
pip install -r requirements.txt

# 3. 配置 Zotero API
cp config.example.yaml config.yaml
# 填入 zotero_api_key, zotero_user_id

# 4. 运行（生成今日推荐）
python main.py

# 5. 设置每日定时（cron）
# 每天早上 8 点运行
(crontab -l; echo "0 8 * * * cd /path/to/zotero-arxiv-daily && python main.py") | crontab -
```

---

### 6.2 GPT Researcher ⭐ 29k+
- 见 [1.3](#13-gpt-researcher--29k)

---

### 6.3 Khoj ⭐ 37.7k
- 见 [1.4](#14-khoj--377k) — 索引本地论文做问答

---

## 7. 🌍 地质与地球科学

### 7.1 GemPy ⭐ 1.4k
- **仓库**: [gempy-project/gempy](https://github.com/gempy-project/gempy)
- **语言**: Python
- **简介**: 开源 3D 结构地质建模，支持隐式建模和随机建模（不确定性分析）
- **适用**: 3D 地质建模、不确定性分析、蒙特卡洛模拟
- **前置依赖**: Python 3.9+, PyTorch

**分步部署**:
```bash
# 1. 安装（含可视化依赖）
pip install gempy[vistex]

# 2. 验证
python -c "import gempy as gp; print(gp.__version__)"

# 3. 快速开始
python -c "
import gempy as gp
# 创建地质模型
geo_model = gp.create_model('MyModel')
gp.init_data(geo_model, [0,1000,0,1000,0,1000], [50,50,50])
print('模型创建成功')
"

# 4. 查看示例
git clone https://github.com/gempy-project/gempy.git
cd gempy/examples
jupyter notebook
```

---

### 7.2 awesome-open-geoscience ⭐ 1.9k
- **仓库**: [softwareunderground/awesome-open-geoscience](https://github.com/softwareunderground/awesome-open-geoscience)
- **简介**: 地球科学开源工具精选列表（地质/地球物理/地球化学/水文/地震等）
- **本地收藏**:
```bash
git clone https://github.com/softwareunderground/awesome-open-geoscience.git
```

---

## 8. ⚡ 生产力与通用工具

### 8.1 yt-dlp ⭐ 197k
- **仓库**: [yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp)
- **语言**: Python
- **简介**: 命令行音视频下载器，支持 1000+ 网站
- **前置依赖**: Python 3.8+, ffmpeg（视频合并）

**分步部署**:
```bash
# 1. 安装
pip install yt-dlp

# 2. 安装 ffmpeg（用于合并音视频）
# Ubuntu/Debian
sudo apt install ffmpeg
# macOS
brew install ffmpeg

# 3. 下载视频
yt-dlp "https://youtube.com/watch?v=xxx"

# 4. 下载音频（mp3）
yt-dlp -x --audio-format mp3 "https://youtube.com/watch?v=xxx"

# 5. 下载播放列表
yt-dlp -i --yes-playlist "播放列表URL"

# 6. 列出可用格式
yt-dlp -F "视频URL"
```

**验证**: `yt-dlp --version`

---

### 8.2 HowToLiveBetter ⭐ 61k
- **仓库**: [eternity4719/HowToLiveBetter](https://github.com/eternity4719/HowToLiveBetter)
- **语言**: HTML | **创建**: 2026-09-07
- **简介**: 高性价比人生指南（长寿防病、急救、省钱理财、法律红线等），每条标明成本/收益/证据等级/出处
- **本地收藏**:
```bash
git clone https://github.com/eternity4719/HowToLiveBetter.git
# 直接用浏览器打开 index.html
```

---

### 8.3 moli ⭐ 17k
- **仓库**: [lexmount/moli](https://github.com/lexmount/moli)
- **语言**: Rust | **创建**: 2026-08-10
- **简介**: 为 AI Agent 打造的轻量无头浏览器
- **分步部署**:
```bash
cargo install moli
# 或下载预编译二进制
```

---

### 8.4 storytold Rust 全家桶 ⭐ 11k-53k
- **仓库**:
  - [photocraft](https://github.com/storytold/photocraft) - 图片编辑器
  - [filmcraft](https://github.com/storytold/filmcraft) - 视频编辑器
  - [lightcraft](https://github.com/storytold/lightcraft) - RAW 编辑器
  - [pdfcraft](https://github.com/storytold/pdfcraft) - PDF 编辑器
  - [wordcraft](https://github.com/storytold/wordcraft) - Word 编辑器
- **语言**: Rust | **创建**: 2026-09-30
- **本地构建**:
```bash
git clone https://github.com/storytold/photocraft.git
cd photocraft && cargo build --release
```

---

## 快速部署速查表

| 项目 | 安装命令 | 验证命令 | 访问地址 |
|------|---------|---------|---------|
| DeepSeek Harness | `npm i -g @deepseek/harness` | `dsh --version` | localhost:3000 |
| OpenClaw | `npm i -g openclaw` | `openclaw --version` | localhost:18789 |
| GPT Researcher | `git clone && pip install -r requirements.txt` | `python -c "import gpt_researcher"` | localhost:8000 |
| Khoj | `pip install khoj-assistant` | `khoj --version` | localhost:42110 |
| n8n | `docker run -p 5678:5678 n8nio/n8n` | `curl localhost:5678/healthz` | localhost:5678 |
| markitdown | `pip install markitdown` | `markitdown --version` | CLI |
| anydoc | `pip install anydoc` | `python -c "import anydoc"` | CLI |
| OpenBB | `pip install openbb` | `python -c "import openbb"` | CLI/Web |
| Qlib | `pip install pyqlib` | `python -c "import qlib"` | CLI |
| yt-dlp | `pip install yt-dlp` | `yt-dlp --version` | CLI |
| GemPy | `pip install gempy[vistex]` | `python -c "import gempy"` | Python |
| Laya | `pip install laya` | `python -c "import laya"` | Python |
| Strata | `git clone && ./install.sh` | `./strata --help` | localhost:8080 |
| Firecrawl | `docker compose up -d` | `curl localhost:3002` | localhost:3002 |

---

## 收藏与 Star 指南

### 方式一：GitHub 网页 Star
直接访问每个仓库链接，点击右上角 ⭐ Star 按钮。

### 方式二：GitHub CLI 批量 Star
```bash
# 安装 gh: https://cli.github.com/
gh auth login

# 批量 Star
gh repo star deepseek-ai/deepseek-harness
gh repo star openclaw/openclaw
gh repo star assafelovic/gpt-researcher
gh repo star khoj-ai/khoj
gh repo star firecrawl/firecrawl
gh repo star microsoft/RD-Agent
gh repo star NandhaKishorM/laya
gh repo star Niko1221/Strata
gh repo star n8n-io/n8n
gh repo star microsoft/markitdown
gh repo star TauricResearch/TradingAgents
gh repo star openbq-org/OpenBB
gh repo star microsoft/qlib
gh repo star TideDra/zotero-arxiv-daily
gh repo star gempy-project/gempy
gh repo star yt-dlp/yt-dlp
```

### 方式三：克隆到本地收藏
```bash
mkdir -p ~/oss-collection && cd ~/oss-collection
git clone https://github.com/TheAlgorithms/Python.git
git clone https://github.com/donnemartin/system-design-primer.git
git clone https://github.com/vinta/awesome-python.git
git clone https://github.com/softwareunderground/awesome-open-geoscience.git
```

---

## 重点推荐（按需求场景）

| 需求场景 | 首选组合 |
|---------|---------|
| **论文写作/文献综述** | GPT Researcher + zotero-arxiv-daily + markitdown |
| **文献管理/本地问答** | Khoj（索引论文）+ Zotero |
| **机器学习/深度学习** | Laya（轻量分类）+ TensorFlow + Kev |
| **本地大模型推理** | Strata（Qwen 一键部署） |
| **金融量化研究** | Qlib（回测）+ OpenBB（数据）+ TradingAgents（AI交易） |
| **软件开发提效** | n8n（自动化）+ markitdown（文档）+ firecrawl（采集） |
| **算法/面试准备** | TheAlgorithms/Python + system-design-primer |
| **地质3D建模** | GemPy + awesome-open-geoscience |
| **AI Agent 开发** | DeepSeek Harness + OpenClaw |
| **通用生产力** | yt-dlp + HowToLiveBetter |

---

*数据来源：GitHub Search API (2026-10-13)，筛选条件：近两月活跃或新创、高 Star、跨领域实用*  
*本清单持续更新，建议定期回访各仓库查看最新版本*
