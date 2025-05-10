export const mpiTopics = [
    {
      id: 'point-to-point',
      title: 'Point-to-Point Communication',
      description: 'Basic MPI_Send and MPI_Recv communication patterns',
      exercises: [
        {
          id: 'ring',
          title: 'Ring Communication',
          tags: ['MPI', 'SendRecv', 'Topology'],
          solved: true,
          reflection:
            `這題是我第一次實作 MPI 的點對點通訊，使用 MPI_Send 和 MPI_Recv 模擬環狀訊息傳遞。
  
  一開始我沒有考慮 rank=0 要從 rank=n-1 接收的特殊情況，導致 deadlock，後來透過先設定 next / prev 並先後執行 send/recv 解決了這問題。
  
  這題也讓我開始理解 process 間如何「傳」與「等」，以及 blocking 與非 blocking 的差別。
  
  我覺得這題很適合當作 MPI 新手的第一題，邏輯上不難但踩雷點很真實。`,
          concepts: [],
          codeLink: 'https://github.com/你的帳號/你的repo/mpi/ring',
          path: '/notes/mpi/ring'
        },
        {
          id: 'pi',
          title: 'Approximating Pi with MPI_Reduce',
          tags: ['MPI', 'Reduction', 'Numerical Integration'],
          solved: true,
          reflection:
            `這題其實讓我卡最久的地方不是程式，而是數學。
  
  原來 \( \int_0^1 \frac{4}{1+x^2} dx = \pi \) 是可以透過三角代換的，設 \( x = \tan\theta \) 就能化為 arc tangent。
  雖然平常算題目都背起來了，但這次從頭推導才真正理解它背後為什麼會等於 pi。
  
  在 MPI 部分，這題讓我熟悉了 MPI_Reduce 的用法：每個 process 計算自己區段的面積，最後透過 reduce 操作累加所有結果，最終在 root process 得到 pi 的近似值。
  
  整體來說是一題程式簡單、數學有料的小品題，很適合補足自己積分直覺與 collective 操作概念。`,
          concepts: [
            {
              title: '為什麼 ∫ 4/(1+x²) dx = π？',
              content: '因為 4 / (1 + x²) 是 arctangent 的微分，這題實際上是在積出 tan⁻¹(x) 的面積。'
            },
            {
              title: 'MPI_Reduce 的用途與使用範例',
              content: 'MPI_Reduce 可以讓多個 process 的結果彙總至 root，適合做總和、最大值等聚合運算。\n常見用法為：\nMPI_Reduce(&local_result, &global_result, 1, MPI_DOUBLE, MPI_SUM, 0, MPI_COMM_WORLD);'
            }
          ],
          codeLink: 'https://github.com/你的帳號/你的repo/mpi/pi',
          path: '/notes/mpi/pi'
        }
      ]
    }
  ]
  
  export const getMpiNoteById = (id: string) => {
    for (const topic of mpiTopics) {
      const match = topic.exercises.find((e) => e.id === id)
      if (match) return { ...match, topicTitle: topic.title }
    }
    return null
  }