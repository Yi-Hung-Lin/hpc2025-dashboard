# Chang
title: code_saturne
## [Day 1 & 2] - [5/12 & 5/13]

### ✅ 任務紀錄
- 安裝 code_saturne，並跑出 baseline
---

### 🧪 設定資訊
- 如果要跑這個得話一定要用有支援 x11 forwarding 的環境去 ssh 因為我們的主機是沒有 $display 的
- 運行前更改 run_solver 的 exec 的部分，將原本的 ./cs_solver 改成 mpirun -np 24 -host node1:12,node2:12 ./cs_solver
- cpp 的副程式一定要擺在 case(AIR_QUALITY) 底下的 SRC 裡面才會被 code_saturne run --initialize 編譯到
- baseline 的三隻副程式都在 Questions/code_saturne 裡面，想看的話請去那兒
- setup gui 的圖片都在底下的圖片區
---

### 🐛 問題
- 在剛開始要設定的時候就因為我是用 VS code 去做 ssh 的，但是 VS code 是沒有 x11 forwarding 的，花了一陣子才發現這個問題，改成 mobaXterm 就搞定了
- 在剛開始裝的時候因為 setup 有的地方寫的不是很清楚，所以我把 cpp 的副程式放錯地方，看 listing 一直以為是我在 gui 的 setup 有問題，最後重新整個整理一遍才發現問題出在我檔案放錯資料夾
---

### 🗂 Version
- baseline (stat: 正常)
---

### 📁 Log / Output
![](image/chang/baseline.png)
---

### 🖼 圖片（可選）
![](image/chang/MESH_Setup0.png)
![](image/chang/MESH_Setup1.png)
![](image/chang/MESH_Setup2.png)
![](image/chang/Calc_Setup0.png)
![](image/chang/Calc_Setup1.png)
![](image/chang/Calc_Setup2.png)
![](image/chang/Volume_Setup0.png)
![](image/chang/Volume_Setup1.png)
![](image/chang/Volume_Setup2.png)
![](image/chang/Boundary_Setup0.png)
![](image/chang/Boundary_Setup1.png)
![](image/chang/Time_Setup.png)
![](image/chang/Numerical_Setup.png)
![](image/chang/Postprocessing_Setup0.png)
![](image/chang/Postprocessing_Setup1.png)
![](image/chang/Postprocessing_Setup2.png)
![](image/chang/Postprocessing_Setup3.png)
---