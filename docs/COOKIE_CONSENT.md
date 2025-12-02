# Cookie Consent Banner - Implementation Guide

## Overview
This GDPR-compliant cookie consent banner has been implemented with a "Quiet Luxury" design aesthetic. It blocks non-essential scripts until user consent is granted and persists the user's choice in localStorage.

## Features
✅ **GDPR/DSGVO Compliant** - Granular cookie controls with separate toggles  
✅ **Settings Modal** - Users can customize Marketing and Analytics cookies separately  
✅ **Persistent Storage** - Saves user choice in localStorage  
✅ **Quiet Luxury Design** - Glassmorphism with subtle animations  
✅ **Responsive** - Works on mobile and desktop  
✅ **German Legal Text** - Includes required links to Datenschutz & Impressum  

## Files Created/Modified

### New File
- `components/CookieConsent.tsx` - The main cookie consent component

### Modified Files
- `App.tsx` - Added CookieConsent component import and rendering
- `public/styles/components.css` - Added slide-up animation

## How It Works

### 1. Initial Load
When a user visits the site for the first time:
- The banner appears after a 1-second delay (for better UX)
- Three buttons are shown: "Nur Essenzielle", "Einstellungen", and "Alle akzeptieren"
- No analytics scripts are loaded yet

### 2. User Choices

**Option A: "Alle akzeptieren" (Accept All)**
- Saves `'all'` to localStorage under key `'cookie-consent'`
- Saves full preferences to `'cookie-preferences'` with all cookies enabled
- Calls `initAnalytics()` to initialize all tracking scripts
- Banner disappears

**Option B: "Nur Essenzielle" (Essential Only)**
- Saves `'essential'` to localStorage under key `'cookie-consent'`
- Saves preferences with only essential cookies enabled
- No analytics are loaded
- Banner disappears

**Option C: "Einstellungen" (Settings) - NEW! 🎯**
- Opens a modal with granular cookie controls
- User can toggle:
  - **Essenzielle Cookies** - Always ON (cannot be disabled, DSGVO requirement)
  - **Analyse-Cookies** - Toggle for Google Analytics, etc.
  - **Marketing-Cookies** - Toggle for Facebook Pixel, Google Ads, etc.
- User clicks "Auswahl speichern" to save custom preferences
- Saves `'custom'` to localStorage under key `'cookie-consent'`
- Saves granular preferences to `'cookie-preferences'`
- Only enabled analytics are initialized

### 3. Returning Visitors
- The banner checks localStorage on mount
- If a choice exists, the banner doesn't show
- Analytics are automatically initialized based on saved preferences:
  - `'all'` → All analytics load
  - `'custom'` → Only selected analytics load
  - `'essential'` → No analytics load

## Integrating Your Analytics

The `initAnalytics()` function now supports **granular cookie preferences**. Here's how to integrate your analytics services:

### Google Analytics (Analytics Cookies)
Open `components/CookieConsent.tsx` and update the `initAnalytics()` function:

```typescript
export const initAnalytics = () => {
  const consent = localStorage.getItem('cookie-consent') as ConsentType;
  const preferences = localStorage.getItem('cookie-preferences');
  
  if (consent === 'all') {
    // Initialize all analytics
    window.gtag('config', 'G-XXXXXXXXXX');
    window.fbq('init', 'YOUR_PIXEL_ID');
    console.log('All analytics initialized');
  } else if (consent === 'custom' && preferences) {
    const prefs: CookiePreferences = JSON.parse(preferences);
    
    // Only load analytics if user enabled them
    if (prefs.analytics) {
      window.gtag('config', 'G-XXXXXXXXXX');
      console.log('Analytics cookies enabled');
    }
    
    // Only load marketing if user enabled them
    if (prefs.marketing) {
      window.fbq('init', 'YOUR_PIXEL_ID');
      window.fbq('track', 'PageView');
      console.log('Marketing cookies enabled');
    }
  }
};
```

### Facebook Pixel (Marketing Cookies)
```typescript
if (prefs.marketing) {
  // Facebook Pixel
  window.fbq('init', 'YOUR_PIXEL_ID');
  window.fbq('track', 'PageView');
  
  // Google Ads
  window.gtag('config', 'AW-XXXXXXXXX');
}
```

### Complete Example with All Services
```typescript
export const initAnalytics = () => {
  const consent = localStorage.getItem('cookie-consent') as ConsentType;
  const preferences = localStorage.getItem('cookie-preferences');
  
  if (consent === 'all') {
    // User accepted everything
    window.gtag('config', 'G-XXXXXXXXXX'); // Analytics
    window.fbq('init', 'YOUR_PIXEL_ID'); // Marketing
    window.fbq('track', 'PageView');
    console.log('All analytics initialized');
    
  } else if (consent === 'custom' && preferences) {
    const prefs: CookiePreferences = JSON.parse(preferences);
    
    // Analytics Cookies (Google Analytics, Hotjar, etc.)
    if (prefs.analytics) {
      window.gtag('config', 'G-XXXXXXXXXX');
      
      // Hotjar
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      
      console.log('Analytics cookies enabled');
    }
    
    // Marketing Cookies (Facebook Pixel, Google Ads, LinkedIn, etc.)
    if (prefs.marketing) {
      // Facebook Pixel
      window.fbq('init', 'YOUR_PIXEL_ID');
      window.fbq('track', 'PageView');
      
      // Google Ads
      window.gtag('config', 'AW-XXXXXXXXX');
      
      // LinkedIn Insight Tag
      _linkedin_partner_id = "YOUR_PARTNER_ID";
      
      console.log('Marketing cookies enabled');
    }
  }
};
```

## Adding Analytics Scripts to index.html

Add your analytics scripts to `index.html` but wrap them in a conditional check:

```html
<head>
  <!-- ... other head content ... -->
  
  <!-- Google Analytics (only loads if consent is 'all') -->
  <script>
    if (localStorage.getItem('cookie-consent') === 'all') {
      // Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    }
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  
  <!-- Facebook Pixel -->
  <script>
    if (localStorage.getItem('cookie-consent') === 'all') {
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'YOUR_PIXEL_ID');
      fbq('track', 'PageView');
    }
  </script>
</head>
```

## Design Customization

### Colors
The banner uses these Tailwind classes:
- Background: `bg-white/90` (90% opacity white with blur)
- Border: `border-zinc-100`
- Text: `text-zinc-800`
- Button (Primary): `bg-black text-white`
- Button (Secondary): `text-zinc-600`

To customize, edit `components/CookieConsent.tsx`:

```tsx
// Example: Change to dark theme
<div className="bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800">
  <p className="text-sm text-zinc-200">
    {/* ... */}
  </p>
  <button className="bg-white text-black">
    Alle akzeptieren
  </button>
</div>
```

### Position
Currently fixed at bottom. To change to floating bottom-left:

```tsx
<div className="fixed bottom-6 left-6 max-w-md z-50 animate-slide-up">
  <div className="bg-white/90 backdrop-blur-md border border-zinc-200 rounded-lg shadow-lg">
    {/* ... */}
  </div>
</div>
```

## Testing

### Test First Visit
1. Open DevTools → Application → Local Storage
2. Delete the `cookie-consent` and `cookie-preferences` keys
3. Refresh the page
4. Banner should appear after 1 second with three buttons

### Test "Accept All"
1. Click "Alle akzeptieren"
2. Check localStorage:
   - `cookie-consent` should be `"all"`
   - `cookie-preferences` should be `{"essential":true,"marketing":true,"analytics":true}`
3. Check console - should see "All analytics initialized"
4. Refresh page - banner should NOT appear

### Test "Essential Only"
1. Clear localStorage
2. Refresh page
3. Click "Nur Essenzielle"
4. Check localStorage:
   - `cookie-consent` should be `"essential"`
   - `cookie-preferences` should be `{"essential":true,"marketing":false,"analytics":false}`
5. Check console - should NOT see analytics message
6. Refresh page - banner should NOT appear

### Test "Settings Modal" - NEW! 🎯
1. Clear localStorage
2. Refresh page
3. Click "Einstellungen"
4. Modal should appear with three cookie categories
5. Verify:
   - "Essenzielle Cookies" toggle is disabled (gray, always ON)
   - "Analyse-Cookies" toggle is clickable
   - "Marketing-Cookies" toggle is clickable
6. Toggle "Analyse-Cookies" ON (should turn black)
7. Leave "Marketing-Cookies" OFF (should stay gray)
8. Click "Auswahl speichern"
9. Check localStorage:
   - `cookie-consent` should be `"custom"`
   - `cookie-preferences` should be `{"essential":true,"marketing":false,"analytics":true}`
10. Check console - should see "Analytics cookies enabled" but NOT "Marketing cookies enabled"
11. Refresh page - banner should NOT appear

### Test Modal Cancel
1. Clear localStorage
2. Refresh page
3. Click "Einstellungen"
4. Toggle some options
5. Click "Abbrechen"
6. Modal should close
7. Banner should still be visible
8. localStorage should still be empty

### Test Custom Preferences on Return
1. Manually set localStorage:
   ```javascript
   localStorage.setItem('cookie-consent', 'custom');
   localStorage.setItem('cookie-preferences', '{"essential":true,"marketing":true,"analytics":false}');
   ```
2. Refresh page
3. Check console - should see "Marketing cookies enabled" but NOT "Analytics cookies enabled"
4. Banner should NOT appear

## Legal Compliance Notes

### GDPR Requirements ✅
- ✅ Explicit consent required before non-essential cookies
- ✅ Clear information about cookie usage
- ✅ Links to privacy policy and imprint
- ✅ Easy way to accept or reject
- ✅ Choice is remembered

### What You Still Need
1. **Privacy Policy** - Ensure your privacy policy at `https://www.canvasnova.com/privacy` lists all cookies used
2. **Cookie List** - Document what cookies/trackers you use
3. **Withdrawal Option** - Consider adding a way for users to change their choice later (e.g., a "Cookie Settings" link in footer)

## Adding Cookie Settings to Footer

To let users change their choice later, add this to your footer in `App.tsx`:

```tsx
<button
  onClick={() => {
    localStorage.removeItem('cookie-consent');
    window.location.reload();
  }}
  className="text-xs text-gray-400 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
>
  Cookie-Einstellungen
</button>
```

## Troubleshooting

### Banner doesn't appear
- Check browser console for errors
- Verify localStorage is not blocked
- Check if `cookie-consent` key already exists in localStorage

### Analytics not loading
- Verify `initAnalytics()` is being called
- Check browser console for errors
- Ensure analytics scripts are properly configured
- Check if ad blockers are interfering

### Styling issues
- Verify Tailwind CSS is loaded
- Check if `components.css` is imported in `index.html`
- Inspect element to see which classes are applied

## Support

For questions or issues, check:
1. Browser DevTools Console for errors
2. localStorage for the `cookie-consent` value
3. Network tab to see if analytics scripts are loading
