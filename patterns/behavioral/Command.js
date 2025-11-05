// The Invoker class
class CommandInvoker {
    constructor() {
        this.history = [];
    }

    executeCommand(command) {
        command.execute();
        this.history.push(command);
    }

    undoLastCommand() {
        const command = this.history.pop();
        if (command) {
            command.undo();
        }
    }
}

// The Command interface (conceptual in JS)
class Command {
    execute() {
        throw new Error("Execute method must be implemented.");
    }
    undo() {
        throw new Error("Undo method must be implemented.");
    }
}

// Concrete Command for adding a product to the cart
class AddToCartCommand extends Command {
    constructor(cartService, product) {
        super();
        this.cartService = cartService;
        this.product = product;
         if (typeof this.product.id === "undefined" || this.product.id === null) {
            this.product.id = Date.now();
        }
    }

    execute() {
        // TODO: Implement the execute method.
        // It should call the `addProduct` method of the `cartService`.
        console.log(`[Command] Executing AddToCart for product id=${this.product.id}, name="${this.product.name}"`);
        this.cartService.addProduct(this.product);

    }

    undo() {
        // TODO: Implement the undo method.
        // It should call the `removeProduct` method of the `cartService`,
        // using the product's ID.
        if(this.product && typeof this.product.id != 'undefined') {
            console.log(`[Command] Undo AddToCart: removing product id=${this.product.id}`);
            this.cartService.removeProduct(this.product.id);

        } else {
            console.log("[Command] Cannot undo AddToCart: product id is missing");
        }
    }
}

export { CommandInvoker, AddToCartCommand };
