# Casa Malheiro Website

Static multilingual website for Casa Malheiro holiday homes in Freixo, Northern Portugal.

Production entry points:

- `index.html`
- `pt/index.html`
- `en/index.html`
- `fr/index.html`
- `blog.html`

## Deployment

Deployments run automatically with GitHub Actions after every push to `main`.

Required repository secrets:

- `VPS_HOST`: VPS IP address or host name
- `VPS_USER`: SSH user, for example `root`
- `VPS_SSH_KEY`: private SSH key with access to the VPS
- `VPS_PORT`: SSH port, optional when using `22`
