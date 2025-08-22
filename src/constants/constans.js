
export const paymentResponseMessages = {
    accredited: { statusType: 'success', message:'Pago aprobado exitosamente :)' },
    rejected: { statusType: 'error', message:'Ocurrio un error al realizar el pago' },
    pending_contingency: { statusType: 'info', message:'Tu pago está en revisión. Mercado Pago lo está verificando y te notificaremos pronto.' },
    cc_rejected_call_for_authorize: { statusType: 'info', message:' Pago Rechazado, contacta a tu banco para autorizar' },
    cc_rejected_other_reason: { statusType: 'error', message:'Pago fue rechazado, revisa tu información :(' },
    cc_rejected_insufficient_amount: { statusType: 'info', message:'Rechazado por importe insuficiente' },
    cc_rejected_bad_filled_security_code: { statusType: 'error', message:'Rechazado por código de seguridad inválido :(' },
    cc_rejected_bad_filled_date: { statusType: 'error', message:'Rechazado debido a un problema de fecha de vencimiento' },
    cc_rejected_bad_filled_other: { statusType: 'error', message:'Rechazado debido a un error de formulario' },
  }


  