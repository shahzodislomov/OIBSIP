const cron = require('node-cron');
const Ingredient = require('../models/Ingredient');
const { sendEmail } = require('../services/emailService');

const initStockCron = () => {
  // Run every 30 minutes
  cron.schedule('*/30 * * * *', async () => {
    console.log('🔍 Checking ingredient inventory stock thresholds...');
    try {
      const lowStockItems = await Ingredient.find({
        $expr: { $lte: ['$stockQuantity', '$minStockThreshold'] },
      });

      if (lowStockItems.length > 0) {
        console.warn(`⚠️ Warning: ${lowStockItems.length} ingredients are below minimum stock threshold!`);
        
        const itemList = lowStockItems
          .map((item) => `- ${item.name} (${item.category}): ${item.stockQuantity} ${item.unit} remaining (Threshold: ${item.minStockThreshold})`)
          .join('\n');

        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
        if (adminEmail) {
          await sendEmail({
            to: adminEmail,
            subject: '⚠️ Low Stock Inventory Alert - Pizza Delivery',
            text: `The following ingredient items are running low on stock:\n\n${itemList}\n\nPlease restock these items soon.`,
          }).catch((err) => console.error('Failed to send stock email alert:', err.message));
        }
      }
    } catch (error) {
      console.error('Error checking stock levels:', error.message);
    }
  });

  console.log('⏰ Stock monitoring cron job scheduled (runs every 30 mins).');
};

module.exports = { initStockCron };
