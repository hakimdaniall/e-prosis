import { Steps, Button } from "antd";

interface StepperProps {
  current: number;
  setCurrent: (step: number) => void;
}

const Stepper = ({ current, setCurrent }: StepperProps) => {
  return (
    <div>
      <Steps
        direction="vertical"
        current={current}
        items={[
          {
            title: 'Ketua Pusat Pengajian IPSIS-FSG',
            description: current >= 0 ? '3 Hari Bekerja' : 'Tiada status',
          },
          {
            title: 'Pegawai Perolehan',
            description: current >= 1 ? '5 Hari Bekerja' : 'Tiada status',
          },
          {
            title: 'Pelawaan Vendor',
            description: current >= 2 ? '2 Bulan' : 'Tiada status',
          },
          {
            title: 'Kutipan',
            description: current >= 3 ? 'Tempoh kutipan ialah 1 minggu. Jika tiada kutipan dilakukan, bahan kimia yang dibeli akan dihantar ke stor simpanan.' : 'Tiada status',
          },
          {
            title: 'Selesai',
            description: current > 4 ? 'Kutipan selesai' : 'Tiada status',
          },
        ]}
      />
    </div>
  );
};

export default Stepper;
