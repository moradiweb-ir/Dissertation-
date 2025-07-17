import { IAppointment } from "@/interfaces";
import { updateAppointmentStatus } from "@/server-actions/appointments";
import { Alert, Button, message, Modal } from "antd";
import React from "react";

interface CancelAppointmentModalProps {
  showCancelAppointmentModal: boolean;
  setShowCancelAppointmentModal: (value: boolean) => void;
  appointment: IAppointment;
}

function CancelAppointmentModal({
  showCancelAppointmentModal,
  setShowCancelAppointmentModal,
  appointment,
}: CancelAppointmentModalProps) {
  const [loading, setLoading] = React.useState(false);

  const handleCancelAppointment = async () => {
    try {
      setLoading(true);
      const { success, message: msg } = await updateAppointmentStatus({
        appointmentId: appointment._id,
        status: "لغو شده",
      }); 
      if (!success) {
        throw new Error(msg);
      }
      message.success("قرار ملاقات با موفقیت لغو شد");
      setShowCancelAppointmentModal(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="لغو قرار ملاقات"
      open={showCancelAppointmentModal}
      onCancel={() => setShowCancelAppointmentModal(false)}
      onClose={() => setShowCancelAppointmentModal(false)}
      centered
      footer={null}
    >
      <Alert
        message={
          <p className="text-sm">
            آیا مطمئن هستید که می‌خواهید قرار ملاقات را لغو کنید؟{" "}
            <b>{appointment.doctor.name}</b> در <b>{appointment.date}</b> در{" "}
            <b>{appointment.time}</b> از <b>{appointment.patient.name}</b> ?
          </p>
        }
        type="warning"
      />

      <div className="mt-5 flex justify-end gap-5">
        <Button disabled={loading}>بستن</Button>
        <Button
          danger
          type="primary"
          loading={loading}
          onClick={handleCancelAppointment}
        >
          بله، لغو نوبت
        </Button>
      </div>
    </Modal>
  );
}

export default CancelAppointmentModal;
