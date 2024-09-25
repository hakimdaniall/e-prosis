const orderData = [
    {
      id: 1,
      title: 'Order number 1',
      delivery_steps: [
        {
          step: 'Ketua Pusat Pengajian IPSIS-FSG',
          status: 'finish',
          timestamp: '2024-09-22T08:00:00Z',
          description: '3 Hari Bekerja',
        },
        {
          step: 'Pegawai Perolehan',
          status: 'finish',
          timestamp: '2024-09-23T12:00:00Z',
          description: '5 Hari Bekerja',
        },
        {
          step: 'Pelawaan Vendor',
          status: 'finish',
          timestamp: '2024-09-23T12:00:00Z',
          description: '2 Bulan',
        },
        {
          step: 'Kutipan',
          status: 'process',
          timestamp: null,
          description: null,
        },
        {
          step: 'Selesai',
          status: null,
          timestamp: null,
          description: null,
        },
      ], 
      rating: null,
    },
    {
      "id": 2,
      title: 'Order number 2',
      "delivery_steps": [
        {
          "step": "Ketua Pusat Pengajian IPSIS-FSG",
          "status": "finish",
          "timestamp": "2024-09-10T08:00:00Z",
          "description": "3 Hari Bekerja"
        },
        {
          "step": "Pegawai Perolehan",
          "status": "finish",
          "timestamp": "2024-09-12T10:00:00Z",
          "description": "5 Hari Bekerja"
        },
        {
          "step": "Pelawaan Vendor",
          "status": "process",
          "timestamp": "2024-09-14T11:00:00Z",
          "description": "2 Bulan"
        },
        {
          "step": "Kutipan",
          "status": null,
          "timestamp": null,
          "description": null
        },
        {
          "step": "Selesai",
          "status": null,
          "timestamp": null,
          "description": null
        }
      ],
      rating: null,
    },
    {
      "id": 3,
      title: 'Order number 3',
      "delivery_steps": [
        {
          "step": "Ketua Pusat Pengajian IPSIS-FSG",
          "status": "finish",
          "timestamp": "2024-08-15T09:00:00Z",
          "description": "2 Hari Bekerja"
        },
        {
          "step": "Pegawai Perolehan",
          "status": "process",
          "timestamp": "2024-08-17T11:30:00Z",
          "description": "4 Hari Bekerja"
        },
        {
          "step": "Pelawaan Vendor",
          "status": null,
          "timestamp": null,
          "description": null
        },
        {
          "step": "Kutipan",
          "status": null,
          "timestamp": null,
          "description": null
        },
        {
          "step": "Selesai",
          "status": null,
          "timestamp": null,
          "description": null
        }
      ],
      rating: null,
    },
    {
      "id": 4,
      title: 'Order number 4',
      "delivery_steps": [
        {
          "step": "Ketua Pusat Pengajian IPSIS-FSG",
          "status": "finish",
          "timestamp": "2024-09-01T08:00:00Z",
          "description": "3 Hari Bekerja"
        },
        {
          "step": "Pegawai Perolehan",
          "status": "finish",
          "timestamp": "2024-09-05T09:30:00Z",
          "description": "2 Hari Bekerja"
        },
        {
          "step": "Pelawaan Vendor",
          "status": "finish",
          "timestamp": "2024-09-08T10:45:00Z",
          "description": "3 Bulan"
        },
        {
          "step": "Kutipan",
          "status": "process",
          "timestamp": "2024-09-10T13:00:00Z",
          "description": "1 Minggu"
        },
        {
          "step": "Selesai",
          "status": null,
          "timestamp": null,
          "description": null
        }
      ],
      rating: null,
    },
    {
      "id": 5,
      title: 'Order number 5',
      "delivery_steps": [
        {
          "step": "Ketua Pusat Pengajian IPSIS-FSG",
          "status": "finish",
          "timestamp": "2024-08-25T08:00:00Z",
          "description": "2 Hari Bekerja"
        },
        {
          "step": "Pegawai Perolehan",
          "status": "finish",
          "timestamp": "2024-08-27T09:00:00Z",
          "description": "1 Hari Bekerja"
        },
        {
          "step": "Pelawaan Vendor",
          "status": "finish",
          "timestamp": "2024-08-28T10:15:00Z",
          "description": "3 Bulan"
        },
        {
          "step": "Kutipan",
          "status": "finish",
          "timestamp": "2024-09-01T11:30:00Z",
          "description": "1 Minggu"
        },
        {
          "step": "Selesai",
          "status": "process",
          "timestamp": "2024-09-07T14:00:00Z",
          "description": "Kutipan selesai"
        }
      ],
      rating: null,
    },
    {
      "id": 6,
      title: 'Order number 6',
      "delivery_steps": [
        {
          "step": "Ketua Pusat Pengajian IPSIS-FSG",
          "status": "finish",
          "timestamp": "2024-07-15T08:00:00Z",
          "description": "3 Hari Bekerja"
        },
        {
          "step": "Pegawai Perolehan",
          "status": "process",
          "timestamp": "2024-07-18T09:15:00Z",
          "description": "5 Hari Bekerja"
        },
        {
          "step": "Pelawaan Vendor",
          "status": null,
          "timestamp": null,
          "description": null
        },
        {
          "step": "Kutipan",
          "status": null,
          "timestamp": null,
          "description": null
        },
        {
          "step": "Selesai",
          "status": null,
          "timestamp": null,
          "description": null
        }
      ],
      rating: null,
    },
    {
      "id": 7,
      title: 'Order number 7',
      "delivery_steps": [
        {
          "step": "Ketua Pusat Pengajian IPSIS-FSG",
          "status": "finish",
          "timestamp": "2024-09-15T08:00:00Z",
          "description": "2 Hari Bekerja"
        },
        {
          "step": "Pegawai Perolehan",
          "status": "finish",
          "timestamp": "2024-09-17T10:30:00Z",
          "description": "3 Hari Bekerja"
        },
        {
          "step": "Pelawaan Vendor",
          "status": "process",
          "timestamp": "2024-09-20T11:00:00Z",
          "description": "2 Bulan"
        },
        {
          "step": "Kutipan",
          "status": null,
          "timestamp": null,
          "description": null
        },
        {
          "step": "Selesai",
          "status": null,
          "timestamp": null,
          "description": null
        }
      ],
      rating: null,
    },
    {
      "id": 8,
      title: 'Order number 7',
      "delivery_steps": [
        {
          "step": "Ketua Pusat Pengajian IPSIS-FSG",
          "status": "finish",
          "timestamp": "2024-09-15T08:00:00Z",
          "description": "2 Hari Bekerja"
        },
        {
          "step": "Pegawai Perolehan",
          "status": "finish",
          "timestamp": "2024-09-17T10:30:00Z",
          "description": "3 Hari Bekerja"
        },
        {
          "step": "Pelawaan Vendor",
          "status": "finish",
          "timestamp": "2024-09-20T11:00:00Z",
          "description": "2 Bulan"
        },
        {
          "step": "Kutipan",
          "status": "finish",
          "timestamp": "2024-09-20T11:00:00Z",
          "description": "Kutipan selesai"
        },
        {
          "step": "Selesai",
          "status": "finish",
          "timestamp": "2024-09-20T11:00:00Z",
          "description": "Kutipan selesai"
        }
      ],
      rating: null,
    },
    {
      "id": 9,
      title: 'Order number 7',
      "delivery_steps": [
        {
          "step": "Ketua Pusat Pengajian IPSIS-FSG",
          "status": "finish",
          "timestamp": "2024-09-15T08:00:00Z",
          "description": "2 Hari Bekerja"
        },
        {
          "step": "Pegawai Perolehan",
          "status": "finish",
          "timestamp": "2024-09-17T10:30:00Z",
          "description": "3 Hari Bekerja"
        },
        {
          "step": "Pelawaan Vendor",
          "status": "finish",
          "timestamp": "2024-09-20T11:00:00Z",
          "description": "2 Bulan"
        },
        {
          "step": "Kutipan",
          "status": "finish",
          "timestamp": "2024-09-20T11:00:00Z",
          "description": "Kutipan selesai"
        },
        {
          "step": "Selesai",
          "status": "finish",
          "timestamp": "2024-09-20T11:00:00Z",
          "description": "Kutipan selesai"
        }
      ],
      rating: 5,
    },
]
  

export default orderData;