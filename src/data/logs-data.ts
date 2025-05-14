export const logs = [
  {
    "id": "chang",
    "name": "Chang",
    "title": "code_saturne",
    "github": "",
    "progress": {
      "solved": 1,
      "total": 7
    },
    "latest": "Day 1 & 2：安裝 code_saturne，並跑出 baseline",
    "lastUpdated": "2025-05-14T04:59:56.308Z",
    "fullText": "# Chang\r\ntitle: code_saturne\r\n## [Day 1 & 2] - [5/12 & 5/13]\r\n\r\n### ✅ 任務紀錄\r\n- 安裝 code_saturne，並跑出 baseline\r\n---\r\n\r\n### 🧪 設定資訊\r\n- 如果要跑這個得話一定要用有支援 x11 forwarding 的環境去 ssh 因為我們的主機是沒有 $display 的\r\n- 運行前更改 run_solver 的 exec 的部分，將原本的 ./cs_solver 改成 mpirun -np 24 -host node1:12,node2:12 ./cs_solver\r\n- cpp 的副程式一定要擺在 case(AIR_QUALITY) 底下的 SRC 裡面才會被 code_saturne run --initialize 編譯到\r\n- baseline 的三隻副程式都在 Questions/code_saturne 裡面，想看的話請去那兒\r\n- setup gui 的圖片都在底下的圖片區\r\n---\r\n\r\n### 🐛 問題\r\n- 在剛開始要設定的時候就因為我是用 VS code 去做 ssh 的，但是 VS code 是沒有 x11 forwarding 的，花了一陣子才發現這個問題，改成 mobaXterm 就搞定了\r\n- 在剛開始裝的時候因為 setup 有的地方寫的不是很清楚，所以我把 cpp 的副程式放錯地方，看 listing 一直以為是我在 gui 的 setup 有問題，最後重新整個整理一遍才發現問題出在我檔案放錯資料夾\r\n---\r\n\r\n### 🗂 Version\r\n- baseline (stat: 正常)\r\n---\r\n\r\n### 📁 Log / Output\r\n![](image/chang/baseline.png)\r\n---\r\n\r\n### 🖼 圖片（可選）\r\n![](image/chang/MESH_Setup0.png)\r\n![](image/chang/MESH_Setup1.png)\r\n![](image/chang/MESH_Setup2.png)\r\n![](image/chang/Calc_Setup0.png)\r\n![](image/chang/Calc_Setup1.png)\r\n![](image/chang/Calc_Setup2.png)\r\n![](image/chang/Volume_Setup0.png)\r\n![](image/chang/Volume_Setup1.png)\r\n![](image/chang/Volume_Setup2.png)\r\n![](image/chang/Boundary_Setup0.png)\r\n![](image/chang/Boundary_Setup1.png)\r\n![](image/chang/Time_Setup.png)\r\n![](image/chang/Numerical_Setup.png)\r\n![](image/chang/Postprocessing_Setup0.png)\r\n![](image/chang/Postprocessing_Setup1.png)\r\n![](image/chang/Postprocessing_Setup2.png)\r\n![](image/chang/Postprocessing_Setup3.png)\r\n---"
  },
  {
    "id": "elystal",
    "name": "Elystal",
    "title": "未指定任務",
    "github": "",
    "progress": {
      "solved": 1,
      "total": 7
    },
    "latest": "Day N：做了哪些事（安裝、跑 code、測試參數...）",
    "lastUpdated": "2025-05-11T09:31:03.922Z",
    "fullText": "# Elystal\r\n\r\n## [Day N] - [日期]\r\n\r\n### ✅ 任務紀錄\r\n- 做了哪些事（安裝、跑 code、測試參數...）\r\n\r\n### 🧪 設定資訊\r\n- 使用了哪些套件 / flag / 節點\r\n\r\n### 🐛 問題\r\n- 遇到什麼問題？初步分析？\r\n\r\n### 🗂 Version\r\n- 版本命名 + 狀態（成功 / 失敗 / 待驗證）\r\n\r\n### 📁 Log / Output\r\n- 放連結或文字區塊\r\n\r\n### 🖼 圖片（可選）\r\n![](image/elystal/test.jpg)"
  },
  {
    "id": "jc",
    "name": "JC",
    "title": "未指定任務",
    "github": "",
    "progress": {
      "solved": 1,
      "total": 7
    },
    "latest": "Day N：做了哪些事（安裝、跑 code、測試參數...）",
    "lastUpdated": "2025-05-11T09:31:02.025Z",
    "fullText": "# JC\r\n\r\n## [Day N] - [日期]\r\n\r\n### ✅ 任務紀錄\r\n- 做了哪些事（安裝、跑 code、測試參數...）\r\n\r\n### 🧪 設定資訊\r\n- 使用了哪些套件 / flag / 節點\r\n\r\n### 🐛 問題\r\n- 遇到什麼問題？初步分析？\r\n\r\n### 🗂 Version\r\n- 版本命名 + 狀態（成功 / 失敗 / 待驗證）\r\n\r\n### 📁 Log / Output\r\n- 放連結或文字區塊\r\n\r\n### 🖼 圖片（可選）\r\n![](image/jc/test.jpg)"
  }
]
