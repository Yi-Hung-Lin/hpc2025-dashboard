export const logs = [
  {
    "id": "test",
    "name": "Hazcashi",
    "title": "未指定任務",
    "github": "",
    "progress": {
      "solved": 2,
      "total": 7
    },
    "latest": "block size 128 → 效能下降",
    "lastUpdated": "2025-05-10T18:56:13.606Z",
    "fullLog": [
      {
        "day": "Day 1",
        "lines": [
          {
            "type": "text",
            "content": "跑 baseline：10.3s"
          },
          {
            "type": "text",
            "content": "GCC + OpenBLAS"
          }
        ]
      },
      {
        "day": "Day 2",
        "lines": [
          {
            "type": "text",
            "content": "block size 128 → 效能下降"
          },
          {
            "type": "text",
            "content": "loop unroll（失敗）"
          },
          {
            "type": "image",
            "src": "image/profile-symbolic.png"
          }
        ]
      }
    ]
  }
]
