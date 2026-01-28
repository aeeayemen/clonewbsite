// Language Management System
class LanguageManager {
    constructor() {
        this.currentLang = this.getSavedLanguage() || 'en';
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLang, false);

        // Setup language switcher clicks
        document.addEventListener('DOMContentLoaded', () => {
            const langSwitchers = document.querySelectorAll('.lang-switcher');
            langSwitchers.forEach(switcher => {
                switcher.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleLanguage();
                });
            });
        });
    }

    getSavedLanguage() {
        return localStorage.getItem('preferredLanguage');
    }

    saveLanguage(lang) {
        localStorage.setItem('preferredLanguage', lang);
    }

    setLanguage(lang, save = true) {
        this.currentLang = lang;

        // Save preference
        if (save) {
            this.saveLanguage(lang);
        }

        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.classList.toggle('rtl', lang === 'ar');
        document.body.classList.toggle('ltr', lang === 'en');

        // Translate content
        this.translatePage();

        // Update language switcher button
        this.updateLanguageSwitcher();
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'en' ? 'ar' : 'en';
        this.setLanguage(newLang);
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = translations[this.currentLang][key];

            if (translation) {
                // Check if element has special handling
                if (element.hasAttribute('data-i18n-placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    updateLanguageSwitcher() {
        const langSwitchers = document.querySelectorAll('.lang-switcher');
        langSwitchers.forEach(switcher => {
            if (this.currentLang === 'ar') {
                switcher.innerHTML = '<img src="https://flagcdn.com/w20/gb.png" width="20"> English';
            } else {
                switcher.innerHTML = '<img src="https://fpcsolution.net/wp-content/plugins/sitepress-multilingual-cms/res/flags/ar.svg" width="20"> العربية';
            }
        });
    }
}

// Initialize language manager
const langManager = new LanguageManager();
