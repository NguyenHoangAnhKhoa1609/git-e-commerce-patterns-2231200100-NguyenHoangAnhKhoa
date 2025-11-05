import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        // TODO: Implement the Facade method.
        // This method should orchestrate the calls to the subsystem services
        // in the correct order to simplify the checkout process.
        // 1. Check if all products are in stock using `inventoryService.checkStock()`.
        // 2. If they are, process the payment using `paymentService.processPayment()`.
        // 3. If payment is successful, arrange shipping using `shippingService.arrangeShipping()`.
        // 4. Log the result of each step. If a step fails, log it and stop.
        console.log("CheckoutFacade: Starting order placement...");
        const stockOk = this.inventoryService.checkStock(orderDetails.productIds);
        if(!stockOk) {
            console.log("CheckoutFacade: Order failed - items are out of stock.");
            return false;
        }
        console.log("CheckoutFacade: Inventory check passed.");
        const paymentOk = this.paymentService.processPayment(orderDetails.userId, orderDetails.amout);
        if(!paymentOk) {
            console.log("CheckoutFacade: Order failed - payment unsuccessfull.");
            return false;
        }
        console.log("CheckoutFacade: Payment processed successfully.");
        const shippingOk = this.shippingService.arrangeShipping(orderDetails.userId, orderDetails.shippingInfo);
        if(!shippingOk) {
            console.log("ChekcoutFacade: Order failed - shipping failed.");
            return false;
        }
        console.log("CheckoutFacade: Shipping arranged successfully.");
        console.log("CheckoutFacade: Order successfully");
        return true;
    }
}

export { CheckoutFacade };
