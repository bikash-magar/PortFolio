// Session Management Utility
class SessionManager {
  constructor() {
    this.sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours in milliseconds (disabled 1-minute timeout)
    this.warningTimeout = 23.5 * 60 * 60 * 1000; // Show warning after 23.5 hours
    this.timeoutId = null;
    this.warningTimeoutId = null;
    this.lastActivity = Date.now();
    this.isWarningShown = false;
    this.isDisabled = true; // Disable session management
    
    // Only initialize if not disabled
    if (!this.isDisabled) {
      this.initializeSession();
    }
  }

  initializeSession() {
    // Track user activity
    this.trackActivity();
    
    // Handle tab/window close
    this.handleTabClose();
    
    // Start session timer
    this.resetSessionTimer();

    // Handle page visibility changes
    this.handleVisibilityChange();
  }

  trackActivity() {
    // Skip if session management is disabled
    if (this.isDisabled) {
      return;
    }
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const resetTimer = () => {
      this.lastActivity = Date.now();
      this.resetSessionTimer();
      
      // Hide warning if it was shown
      if (this.isWarningShown) {
        this.hideSessionWarning();
      }
    };

    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });
  }

  resetSessionTimer() {
    // Skip if session management is disabled
    if (this.isDisabled) {
      return;
    }
    
    // Clear existing timers
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.warningTimeoutId) {
      clearTimeout(this.warningTimeoutId);
    }

    // Set warning timer (23.5 hours)
    this.warningTimeoutId = setTimeout(() => {
      this.showSessionWarning();
    }, this.warningTimeout);

    // Set logout timer (24 hours)
    this.timeoutId = setTimeout(() => {
      this.handleAutoLogout('Session expired due to inactivity');
    }, this.sessionTimeout);
  }

  showSessionWarning() {
    // Skip if session management is disabled
    if (this.isDisabled || !this.isTokenValid()) return;
    
    this.isWarningShown = true;
    
    // Import toast dynamically to avoid circular dependencies
    import('react-hot-toast').then(({ default: toast }) => {
      toast('⚠️ Session Warning: Your session will expire in 30 minutes. Click anywhere to continue.', {
        duration: 15000,
        position: 'top-center',
        style: {
          minWidth: '300px',
          backgroundColor: '#fef3c7',
          color: '#92400e',
          border: '1px solid #f59e0b'
        },
        icon: '⏰'
      });
    });
  }

  hideSessionWarning() {
    this.isWarningShown = false;
    // Reset the timer when user chooses to continue
    this.resetSessionTimer();
  }

  handleTabClose() {
    // Set session expiry when tab is closed
    window.addEventListener('beforeunload', () => {
      const expiryTime = Date.now() + this.sessionTimeout;
      sessionStorage.setItem('portfolio_session_expiry', expiryTime.toString());
    });

    // Check session validity when tab is focused again
    window.addEventListener('focus', () => {
      this.checkSessionValidity();
    });

    // Also check when page becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.checkSessionValidity();
      }
    });
  }

  handleVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Page is hidden, pause the timer
        this.pauseTimer();
      } else {
        // Page is visible, resume and check session
        this.resumeTimer();
        this.checkSessionValidity();
      }
    });
  }

  pauseTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.warningTimeoutId) {
      clearTimeout(this.warningTimeoutId);
    }
  }

  resumeTimer() {
    const timeSinceLastActivity = Date.now() - this.lastActivity;
    
    if (timeSinceLastActivity >= this.sessionTimeout) {
      this.handleAutoLogout('Session expired while tab was inactive');
    } else {
      const remainingTime = this.sessionTimeout - timeSinceLastActivity;
      const remainingWarningTime = this.warningTimeout - timeSinceLastActivity;
      
      if (remainingWarningTime > 0) {
        this.warningTimeoutId = setTimeout(() => {
          this.showSessionWarning();
        }, remainingWarningTime);
      } else if (!this.isWarningShown) {
        this.showSessionWarning();
      }
      
      this.timeoutId = setTimeout(() => {
        this.handleAutoLogout('Session expired due to inactivity');
      }, remainingTime);
    }
  }

  checkSessionValidity() {
    const sessionExpiry = sessionStorage.getItem('portfolio_session_expiry');
    
    if (sessionExpiry) {
      const expiryTime = parseInt(sessionExpiry);
      const currentTime = Date.now();
      
      if (currentTime > expiryTime) {
        this.handleAutoLogout('Session expired while tab was closed');
        return;
      }
      
      // Remove the expiry time as session is still valid
      sessionStorage.removeItem('portfolio_session_expiry');
    }

    // Check if token still exists and is valid
    if (!this.isTokenValid()) {
      this.handleAutoLogout('Invalid session');
    }
  }

  isTokenValid() {
    const token = localStorage.getItem('portfolio_token');
    if (!token) return false;
    
    try {
      // Basic JWT validation (check if it's not expired)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      return payload.exp && payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  handleAutoLogout(reason) {
    console.log('Auto logout triggered:', reason);
    
    // Clear all timers
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.warningTimeoutId) {
      clearTimeout(this.warningTimeoutId);
    }

    // Clear session data
    localStorage.removeItem('portfolio_token');
    sessionStorage.removeItem('portfolio_session_expiry');
    
    // Show logout notification
    import('react-hot-toast').then(({ default: toast }) => {
      toast.error(`Logged out: ${reason}`, {
        duration: 5000,
        position: 'top-center'
      });
    });

    // Redirect to home page or login
    if (window.location.pathname.includes('/dashboard')) {
      window.location.href = '/';
    }

    // Trigger logout in the app context
    window.dispatchEvent(new CustomEvent('autoLogout', { detail: { reason } }));
  }

  // Method to manually extend session
  extendSession() {
    this.lastActivity = Date.now();
    this.resetSessionTimer();
    
    if (this.isWarningShown) {
      this.hideSessionWarning();
    }
  }

  // Method to manually logout
  logout() {
    this.handleAutoLogout('Manual logout');
  }

  // Cleanup method
  destroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.warningTimeoutId) {
      clearTimeout(this.warningTimeoutId);
    }
  }
}

// Export singleton instance
export default new SessionManager();