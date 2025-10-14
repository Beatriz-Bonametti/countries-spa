import * as yup from 'yup';

export const searchSchema = yup.object({
  mode: yup
    .mixed()
    .oneOf(['name', 'code', 'region'], 'Tipo de busca inválido')
    .required('Escolha o tipo de busca'),
  query: yup
    .string()
    .trim()
    .when('mode', (mode, sch) => {
      const m = mode?.[0];
      if (m === 'code') {
        return sch.min(2, 'Código deve ter pelo menos 2 caracteres').required('Informe o código');
      }
      if (m === 'region') {
        const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
        return sch.oneOf(regions, 'Região inválida').required('Escolha uma região');
      }
      return sch.min(1, 'Digite um nome').required('Obrigatório');
    }),
});

export async function validateSearch(input) {
  try {
    await searchSchema.validate(input, { abortEarly: false });
    return { valid: true, errors: {} };
  } catch (err) {
    const errors = {};
    if (err?.inner?.length) {
      err.inner.forEach((e) => {
        if (e.path && !errors[e.path]) errors[e.path] = e.message;
      });
    } else if (err?.path) {
      errors[err.path] = err.message;
    }
    return { valid: false, errors };
  }
}