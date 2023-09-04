export function env(key: string) {
  const variable = process.env[key];

  if (!variable) {
    throw new Error(`Missing environment variable in .env.local: ${key}`);
  }

  return variable;
}

