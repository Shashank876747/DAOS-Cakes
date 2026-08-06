# Security Specification & Test Suite

## Data Invariants
1. A User Profile document under `/users/{userId}` must match the user's `request.auth.uid` or be managed by an Administrator.
2. Orders submitted to `/orders/{orderId}` must pass strict schema validation (valid email, phone, event date, order type).
3. Site settings `/site_settings/{settingId}` and Menu catalog `/menu_items/{itemId}` are publicly readable but strictly modifiable only by authenticated Administrators.
4. User identity spoofing is forbidden; users cannot elevate their own role to 'admin' unless verified against trusted records or admin email.

## Dirty Dozen Payloads Test Targets
1. Unauthorized profile update attempting role escalation.
2. Order creation with oversized string payload (Denial of Wallet).
3. Order creation with missing required field `fullName`.
4. Reading user profiles as an unauthenticated guest.
5. Modifying site settings as a non-admin customer.
6. Deleting menu catalog items as an unauthenticated guest.
7. Updating someone else's order status as a customer.
8. Listing all user accounts as a customer.
9. Injecting invalid document ID with special characters into `/orders/`.
10. Creating an order with invalid contactMethod enum.
11. Modifying immutable `createdAt` field on user profile.
12. Overwriting global site settings document as guest.
