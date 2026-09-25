# Task runner and build entrypoint for the Torchsnap website.
# Run `just --list` to see all available recipes.

# The Astro site, its package.json and its lockfile live in `web/`.
set working-directory := "web"

# Show available recipes
default:
    @just --list

# Install dependencies exactly as pinned in bun.lock
install:
    bun install --frozen-lockfile

# Start the dev server on http://localhost:4321
dev:
    bun run dev

# Build the static site into web/dist/
build:
    bun run build

# Serve web/dist/ on http://localhost:4321
preview:
    bun run preview

# Regenerate the favicons in web/public/ from the original mascot
build-favicon:
    bun run build:favicon

# Regenerate the OG card web/public/og.png
build-og:
    bun run build:og

# Trim fully transparent margins from an image (see web/README.md)
[positional-arguments]
trim-image *args:
    bun run trim:image "$@"

# The frozen install comes first so the gates run against the versions
# in bun.lock, not whatever an older install left in node_modules.

# Run the full quality cycle: install, then build
fullcycle:
    just install
    just build
