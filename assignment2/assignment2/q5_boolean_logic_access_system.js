// Q5. Boolean Logic Access System

// Returns "Secure" only if ALL required conditions hold
function checkAccess(isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside) {
  // Alarm on AND door closed/locked AND window closed AND owner inside
  const isSecure = isAlarmOn && isDoorLocked && isWindowClosed && isOwnerInside;

  // Extra use of ! and ||: a quick check for any obvious weakness
  const hasWeakPoint = !isDoorLocked || !isWindowClosed;

  console.log(
    `Door:${isDoorLocked} Window:${isWindowClosed} Alarm:${isAlarmOn} Owner:${isOwnerInside}` +
    ` | Weak point: ${hasWeakPoint} -> ${isSecure ? "Secure" : "Unsafe"}`
  );
}

// Test multiple outcomes (door, window, alarm, owner)
checkAccess(true, true, true, true);    // Secure
checkAccess(false, true, true, true);   // Unsafe - door unlocked
checkAccess(true, false, true, true);   // Unsafe - window open
checkAccess(true, true, false, true);   // Unsafe - alarm off
checkAccess(true, true, true, false);   // Unsafe - owner not inside
