# Ownd Testing Documentation

## Testing Strategy
Ownd employs unit, integration, and performance testing to ensure a bug-free experience.

## Test Cases

**Backend:**
- **Habit Creation API**:
  - Test that valid habit data results in successful creation.
  - Test that unauthorized users are unable to create habits.

**Frontend:**
- **Journal Entry Form**:
  - Test that the journal entry input is functioning.
  - Test that submitting the form triggers the correct API call.

## Performance Testing
Use **Artillery** to simulate high-load scenarios, especially for media-heavy messages.
