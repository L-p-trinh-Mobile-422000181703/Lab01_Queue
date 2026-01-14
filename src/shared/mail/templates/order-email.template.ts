import type { OrderEmailModel } from '../mail.service';

export function renderOrderEmailHtml(order: OrderEmailModel) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Order Confirmation</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <div style="background:#ffffff;border-radius:12px;padding:20px;border:1px solid #e9ecf5;">
        <h2 style="margin:0 0 8px 0;color:#111827;">Thanks, ${escapeHtml(order.customerName)}!</h2>
        <p style="margin:0 0 16px 0;color:#374151;">Your order has been created successfully.</p>

        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:12px;">
          <p style="margin:0 0 6px 0;color:#111827;"><b>Order ID:</b> ${escapeHtml(order.orderId)}</p>
          <p style="margin:0 0 6px 0;color:#111827;"><b>Total:</b> $${order.total.toFixed(2)}</p>
          <p style="margin:0;color:#111827;"><b>Created at:</b> ${escapeHtml(order.createdAt)}</p>
        </div>

        <p style="margin:16px 0 0 0;color:#6b7280;font-size:12px;">
          This is a mock email template (demo).
        </p>
      </div>
    </div>
  </body>
</html>`;
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
