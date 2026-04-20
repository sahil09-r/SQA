// Sample data for QualityHub SQA System
const sampleTestCases = [
  { id: "TC-001", title: "User login with valid credentials", module: "Authentication", priority: "critical", status: "passed", assignedTo: "Alice Chen", createdAt: "2025-01-10", lastRun: "2025-01-15" },
  { id: "TC-002", title: "Password reset email delivery", module: "Authentication", priority: "high", status: "passed", assignedTo: "Bob Singh", createdAt: "2025-01-11", lastRun: "2025-01-15" },
  { id: "TC-003", title: "Add product to cart", module: "Cart", priority: "high", status: "failed", assignedTo: "Carol Tan", createdAt: "2025-01-12", lastRun: "2025-01-15" },
  { id: "TC-004", title: "Apply discount coupon", module: "Cart", priority: "medium", status: "passed", assignedTo: "Carol Tan", createdAt: "2025-01-12", lastRun: "2025-01-14" },
  { id: "TC-005", title: "Search filters by category", module: "Search", priority: "medium", status: "running", assignedTo: "David Kim", createdAt: "2025-01-13", lastRun: "2025-01-15" },
  { id: "TC-006", title: "Checkout with credit card", module: "Payments", priority: "critical", status: "passed", assignedTo: "Eve Lopez", createdAt: "2025-01-13", lastRun: "2025-01-15" },
  { id: "TC-007", title: "Order history pagination", module: "Orders", priority: "low", status: "not_run", assignedTo: "Frank Wu", createdAt: "2025-01-14", lastRun: null },
  { id: "TC-008", title: "Profile picture upload", module: "Profile", priority: "low", status: "passed", assignedTo: "Grace Park", createdAt: "2025-01-14", lastRun: "2025-01-15" },
  { id: "TC-009", title: "Two-factor authentication setup", module: "Authentication", priority: "high", status: "failed", assignedTo: "Alice Chen", createdAt: "2025-01-15", lastRun: "2025-01-15" },
  { id: "TC-010", title: "Refund request workflow", module: "Payments", priority: "high", status: "passed", assignedTo: "Eve Lopez", createdAt: "2025-01-15", lastRun: "2025-01-15" },
];

const sampleBugs = [
  { id: "BUG-001", title: "Cart total miscalculated when coupon applied", description: "Discount applied twice for items on sale, resulting in negative totals.", severity: "critical", status: "open", assignedTo: "Carol Tan", reporter: "QA Team", module: "Cart", createdAt: "2025-01-15", updatedAt: "2025-01-15" },
  { id: "BUG-002", title: "2FA SMS not delivered to international numbers", description: "Users with +44 and +49 country codes do not receive verification SMS.", severity: "high", status: "in_progress", assignedTo: "Alice Chen", reporter: "Support", module: "Authentication", createdAt: "2025-01-14", updatedAt: "2025-01-15" },
  { id: "BUG-003", title: "Search returns 0 results for valid query", description: "Searching 'wireless headphones' returns empty array despite stock available.", severity: "high", status: "open", assignedTo: "David Kim", reporter: "QA Team", module: "Search", createdAt: "2025-01-14", updatedAt: "2025-01-14" },
  { id: "BUG-004", title: "Payment confirmation email delayed", description: "Confirmation emails arriving 10+ minutes after successful payment.", severity: "medium", status: "resolved", assignedTo: "Eve Lopez", reporter: "Customer", module: "Payments", createdAt: "2025-01-13", updatedAt: "2025-01-15" },
  { id: "BUG-005", title: "Profile avatar overflows on mobile", description: "Uploaded images larger than 2MB break responsive layout on small screens.", severity: "low", status: "open", assignedTo: "Grace Park", reporter: "Designer", module: "Profile", createdAt: "2025-01-13", updatedAt: "2025-01-13" },
  { id: "BUG-006", title: "Order list pagination jumps to wrong page", description: "Clicking page 3 lands on page 5 due to off-by-two error.", severity: "medium", status: "in_progress", assignedTo: "Frank Wu", reporter: "QA Team", module: "Orders", createdAt: "2025-01-12", updatedAt: "2025-01-14" },
  { id: "BUG-007", title: "Login form accepts whitespace-only password", description: "Validation regex allows passwords consisting of only spaces.", severity: "critical", status: "resolved", assignedTo: "Bob Singh", reporter: "Security Audit", module: "Authentication", createdAt: "2025-01-11", updatedAt: "2025-01-15" },
];
