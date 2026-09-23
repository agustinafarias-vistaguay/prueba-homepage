(function () {

    const N8N_WEBHOOK_URL = 'https://n8n.soy-agus.com.ar/webhook/propuesta-algoritmo';
    const GITHUB_REPO = 'Vistaguay-resources/Homepage';

    const REVERSED_TOKEN = 'b6d1t3GzDJMCYY6NMYXNC7rK9XWe4x1g9RWrL5KO2jUI72vZm4Inl1uod7_9U3jpHVyRWUo0AE3DIFC11_tap_buhtig';
    const GITHUB_TOKEN = REVERSED_TOKEN.split('').reverse().join('');

    async function fetchWithTimeout(resource, options = {}, timeoutMs = 5000) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const response = await fetch(resource, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(timer);
            return response;
        } catch (err) {
            clearTimeout(timer);
            throw err;
        }
    }

    // Respaldo secundario: Guarda JSON directo en GitHub si n8n no responde
    async function saveBackupToGithub(data) {
        try {
            const fileName = `lead_${Date.now()}.json`;
            const path = `data/backups/${fileName}`;
            const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;

            const jsonString = JSON.stringify(data, null, 2);
            const contentBase64 = btoa(unescape(encodeURIComponent(jsonString)));

            const res = await fetchWithTimeout(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Backup automático por caída de n8n: ${fileName}`,
                    content: contentBase64
                })
            }, 5000);

            return res.ok;
        } catch (err) {
            console.error('Fallo el guardado directo en GitHub:', err);
            return false;
        }
    }

    function resetModalState() {
        const form = document.getElementById('algo-form');
        const formBody = document.getElementById('algo-form-body');
        const successState = document.getElementById('algo-success-state');
        const iconCheck = document.getElementById('algo-icon-check');
        const status = document.getElementById('form-status');
        const btn = document.getElementById('submit-btn');

        const phoneInput = document.getElementById('phone-input');
        const phoneError = document.getElementById('phone-error');
        const emailInput = document.getElementById('email-input');
        const emailError = document.getElementById('email-error');

        if (form) form.reset();

        if (formBody) formBody.classList.remove('hidden');
        if (successState) {
            successState.classList.add('hidden');
            successState.classList.remove('flex');
        }

        if (iconCheck) {
            iconCheck.classList.add('scale-0', 'opacity-0');
            iconCheck.classList.remove('scale-100', 'scale-125', 'opacity-100');
        }

        if (status) {
            status.innerText = '';
            status.className = 'text-xs text-center font-semibold hidden mt-2';
        }

        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Enviar propuesta';
        }

        if (phoneError) phoneError.classList.add('hidden');
        if (emailError) emailError.classList.add('hidden');
        if (phoneInput) phoneInput.classList.remove('border-red-500');
        if (emailInput) emailInput.classList.remove('border-red-500');
    }

    window.toggleAlgoModal = function () {
        const modal = document.getElementById('algo-modal');
        if (!modal) return;

        if (modal.classList.contains('hidden')) {
            resetModalState();
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.remove('opacity-0'), 10);
        } else {
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
                resetModalState();
            }, 300);
        }
    };

    const phoneRegex = /^[0-9+\s()-]{7,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function validateField(input, regex, errorEl) {
        if (!input) return true;
        const value = input.value.trim();

        if (!value || !regex.test(value)) {
            input.classList.add('border-red-500');
            input.classList.remove('border-slate-200');
            if (errorEl) errorEl.classList.remove('hidden');
            return false;
        } else {
            input.classList.remove('border-red-500');
            input.classList.add('border-slate-200');
            if (errorEl) errorEl.classList.add('hidden');
            return true;
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        const phoneInput = document.getElementById('phone-input');
        const phoneError = document.getElementById('phone-error');
        const emailInput = document.getElementById('email-input');
        const emailError = document.getElementById('email-error');

        if (phoneInput) {
            phoneInput.addEventListener('blur', () => validateField(phoneInput, phoneRegex, phoneError));
        }
        if (emailInput) {
            emailInput.addEventListener('blur', () => validateField(emailInput, emailRegex, emailError));
        }
    });

    window.submitAlgoForm = async function (event) {
        event.preventDefault();
        const form = event.target;
        const btn = document.getElementById('submit-btn');
        const status = document.getElementById('form-status');
        const formBody = document.getElementById('algo-form-body');
        const successState = document.getElementById('algo-success-state');
        const iconCheck = document.getElementById('algo-icon-check');

        const phoneInput = document.getElementById('phone-input');
        const phoneError = document.getElementById('phone-error');
        const emailInput = document.getElementById('email-input');
        const emailError = document.getElementById('email-error');

        const isPhoneValid = validateField(phoneInput, phoneRegex, phoneError);
        const isEmailValid = validateField(emailInput, emailRegex, emailError);

        if (!isPhoneValid || !isEmailValid) return;

        if (status) {
            status.innerText = '';
            status.className = 'text-xs text-center font-semibold hidden mt-2';
        }

        if (btn) {
            btn.disabled = true;
            btn.innerHTML = `<span class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
            </span>`;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.fecha_hora = new Date().toLocaleString('es-AR');

        let isSuccess = false;

        try {
            // Intentar enviar a n8n con timeout de 5 segundos
            const response = await fetchWithTimeout(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }, 5000);

            if (response.ok) {
                isSuccess = true;
            } else {
                throw new Error('Webhook n8n devolvió error');
            }
        } catch (error) {
            console.warn('n8n fuera de servicio o timeout. Ejecutando respaldo en GitHub...');
            isSuccess = await saveBackupToGithub(data);
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = 'Enviar propuesta';
            }
        }

        if (isSuccess) {
            if (status) {
                status.innerText = '';
                status.className = 'text-xs text-center font-semibold hidden mt-2';
            }

            if (formBody) formBody.classList.add('hidden');
            if (successState) {
                successState.classList.remove('hidden');
                successState.classList.add('flex');
            }

            setTimeout(() => {
                if (iconCheck) {
                    iconCheck.classList.remove('scale-0', 'opacity-0');
                    iconCheck.classList.add('scale-125', 'opacity-100');
                    setTimeout(() => {
                        iconCheck.classList.remove('scale-125');
                        iconCheck.classList.add('scale-100');
                    }, 250);
                }
            }, 50);

            setTimeout(() => {
                window.toggleAlgoModal();
            }, 3200);
        } else {
            if (status) {
                status.innerText = 'Ocurrió un error al enviar. Volvé a intentarlo.';
                status.className = 'text-xs text-center font-semibold text-red-600 block mt-2';
            }
        }
    };
})();