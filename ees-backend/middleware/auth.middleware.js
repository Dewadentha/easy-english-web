/**
 * Middleware: pastikan user sudah login
 * Dipakai di route yang butuh autentikasi (misal: /api/quiz)
 */
function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: "Unauthorized. Silakan login terlebih dahulu.",
  });
}

module.exports = { requireLogin };