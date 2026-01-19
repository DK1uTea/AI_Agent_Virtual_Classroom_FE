<div align="center">
  <img src="public/AI_Classroom_Logo.png" alt="AI Agent Virtual Classroom Logo" width="200" />
  <h1>AI Agent Virtual Classroom</h1>
  <p><strong>Revolutionizing Online Learning with Intelligence</strong></p>
  
  <p>
    <a href="#key-features">Key Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#project-report">Project Report</a> •
    <a href="#team-members">Team Members</a> •
    <a href="#xem-them">Related Repos</a>
  </p>
</div>

---

## 🚀 Overview

**AI Agent Virtual Classroom** là đồ án tốt nghiệp khóa **D21** tại **Học viện Công nghệ Bưu chính Viễn thông (PTIT) Hà Nội**. Rất may mắn, đồ án đã đạt được điểm số **9.0**, đánh dấu một cột mốc quan trọng trong quá trình học tập và nghiên cứu.

Đây là một nền tảng giáo dục tiên tiến được thiết kế để nâng cao trải nghiệm học tập thông qua trí tuệ nhân tạo. Hệ thống cung cấp cho sinh viên một môi trường tương tác hiện đại, nơi họ có thể xem bài giảng, tương tác với trợ lý AI và trực quan hóa các khái niệm phức tạp thông qua bản đồ tư duy được tạo tự động.

## 📄 Project Report

> [!TIP]
> Bạn có thể xem chi tiết báo cáo đồ án tốt nghiệp để hiểu rõ hơn về kiến trúc và quy trình phát triển hệ thống.

<div align="center">
  <a href="public/Bao_cao_Do_an_Tot_nghiep.pdf" target="_blank">
    <img src="https://img.shields.io/badge/View_Report-PDF-red?style=for-the-badge&logo=adobe-acrobat-reader&logoColor=white" alt="View Project Report" />
  </a>
  <p><i>Click vào nút trên để mở báo cáo trong tab mới</i></p>
</div>

## ✨ Key Features

- 🤖 **AI-Powered Learning Assistant**: Real-time chat interface to ask questions about the lesson content.
- 📺 **Intelligent Video Player**: Professional playback controls with auto-resume functionality (saves your progress).
- 🧠 **Dynamic Mind Map Generation**: Automatically visualizes lesson concepts into interactive flowcharts.
- 📝 **Real-time Transcripts**: Synchronized lesson transcripts for better accessibility and quick reference.
- 📊 **Intelligent Lesson Analysis**: Advanced insights and summaries of lessons using AI agents.
- 📝 **Integrated Quiz System**: Test your knowledge immediately after completing a lesson.
- 🌗 **Premium UI/UX**: Sleek dark mode aesthetics with responsive design for all devices.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15+](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Visualizations**: [XYFlow (React Flow)](https://reactflow.dev/)
- **Video Playback**: [React Player](https://www.npmjs.com/package/react-player)
- **Icons**: [Lucide React](https://lucide.dev/)

## ⚙️ Installation

To get started with the AI Agent Virtual Classroom client locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/DK1uTea/AI_Agent_Virtual_Classroom_FE.git
cd AI_Agent_Virtual_Classroom_FE
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables
Copy the example environment file and update it with your configuration:
```bash
cp .env.example .env
```
Edit the `.env` file:
```env
NEXT_PUBLIC_API_ENDPOINT=your_backend_api_url
NEXT_PUBLIC_BASE_URL=your_frontend_base_url
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 👥 Team Members

Dưới đây là các thành viên đã tham gia thực hiện đồ án này:

| Name | Role | GitHub |
| :--- | :--- | :--- |
| **Đỗ Quang Tuấn** | Frontend Developer | [@DK1uTea](https://github.com/DK1uTea) |
| **Phạm Huy Thái** | AI Developer | [@huythai1602](https://github.com/huythai1602) |
| **Bùi Trung Dũng** | Backend Developer | [@YoloApple](https://github.com/YoloApple) |
| **Phạm Thanh Tùng** | Backend Developer | [@PTungzz](https://github.com/PTungzz) |

## 🔗 Xem thêm

Bạn có thể tham khảo thêm các phần khác của hệ thống tại đây:

| Component | Repository Link |
| :--- | :--- |
| **Auth & User Service + API Gateway** | [Auth & User Service + Gateway Repo](https://github.com/YoloApple/Do_An_2025) |
| **Course Service** | [Course Service Repo](https://github.com/PTungzz/BE_DOAN2025) |
| **AI Service** | [AI Service Repo](https://github.com/huythai1602/Virtual-Classroom-AI-Agent) |

---

<div align="center">
  Built with ❤️ by the AI Agent Virtual Classroom Team
</div>
