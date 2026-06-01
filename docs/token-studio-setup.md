# Token Studio Setup Guide
## How to Connect Figma → GitHub for Zero-Touch Automation

> **Who this is for:** You, Rachael. No dev experience needed. Follow these steps exactly and the pipeline runs itself.

---

## What This Does

Once set up, the automation works like this:

1. You finish designing a component in Figma and update the token values in Token Studio
2. Token Studio automatically pushes the changes to GitHub
3. GitHub Actions detects the change and kicks off the full pipeline:
   - Validates your tokens
   - Transforms them to CSS/TypeScript
   - Uses AI (Claude) to generate the React component code + tests
   - Runs accessibility and unit tests
   - Deploys to Chromatic for visual review
4. You get a GitHub Issue notification if anything fails, or a green checkmark if everything passes

**You do not touch any code.** Ever.

---

## One-Time Setup (Do This Once)

### Step 1: Create a GitHub Personal Access Token (PAT)

This is a special password that lets Token Studio write to your GitHub repo.

1. Go to: https://github.com/settings/tokens/new
2. Sign in if prompted
3. Fill in the form:
   - **Note:** `Token Studio Design System Sync`
   - **Expiration:** `No expiration` (or 1 year)
   - **Scopes — check these boxes:**
     - `repo` (check the top-level checkbox — this selects all repo permissions)
4. Scroll to the bottom and click **Generate token**
5. **COPY THE TOKEN NOW.** GitHub only shows it once. Paste it into a notes app or password manager.
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### Step 2: Add the Token to GitHub Secrets

This stores your PAT securely so GitHub Actions can use it.

1. Go to: https://github.com/NotTheVeal/design-system/settings/secrets/actions
2. Click **New repository secret**
3. Fill in:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Secret:** *(paste your Anthropic API key here — get one at console.anthropic.com if you do not have one)*
4. Click **Add secret**
5. Click **New repository secret** again
6. Fill in:
   - **Name:** `GH_PAT`
   - **Secret:** *(paste the GitHub PAT you created in Step 1)*
7. Click **Add secret**

> **Optional:** If you use Microsoft Teams, add a `TEAMS_WEBHOOK_URL` secret with your Teams incoming webhook URL to get Teams notifications on pipeline pass/fail.

---

### Step 3: Configure Token Studio in Figma

1. Open your design file in Figma: https://www.figma.com/design/drRi3H61QAk5hce44x2G2U/
2. Open the Token Studio plugin (Plugins menu → Token Studio for Figma)
3. In Token Studio, click the **Settings** tab (gear icon)
4. Scroll to **Sync providers** and click **Add new**
5. Choose **GitHub** from the list
6. Fill in the form:
   - **Name:** `PS Design System`
   - **Personal Access Token:** *(paste the GitHub PAT from Step 1)*
   - **Repository:** `NotTheVeal/design-system`
   - **Default Branch:** `main`
   - **File Path:** `tokens/ps-tokens`
7. Click **Save**
8. Token Studio will prompt you to pull or push — click **Pull from GitHub** to sync the existing tokens

---

### Step 4: Enable Auto-Push on Save

This is what makes it truly zero-touch.

1. Still in Token Studio Settings
2. Find the **Push on save** or **Auto-push changes** toggle
3. Turn it **ON**

Now every time you save token changes in Token Studio, they automatically push to GitHub and trigger the pipeline.

---

## Day-to-Day Workflow (After Setup)

### When you update an existing component's tokens:

1. Open Figma → open Token Studio
2. Find the token you want to change and update the value
3. Save (Cmd+S or Ctrl+S)
4. Token Studio pushes to GitHub automatically
5. The pipeline runs — you get a GitHub notification when done

### When you design a brand new component:

1. Design the component in Figma
2. Go to: https://github.com/NotTheVeal/design-system/actions/workflows/generate-component.yml
3. Click **Run workflow** (top right)
4. Enter the component name in **PascalCase** (e.g. `SearchBar`, `PriceTag`, `StatusBadge`)
5. Click **Run workflow**
6. The pipeline generates the React component code + tests automatically
7. If it passes: done! If it fails: you get a GitHub Issue with details

> **PascalCase means:** First letter of every word is capitalized, no spaces or dashes.
> ✅ `SearchBar` ✅ `NavHeader` ✅ `ProductCard`
> ❌ `search-bar` ❌ `navheader` ❌ `product card`

---

## How to Check Pipeline Status

- Go to: https://github.com/NotTheVeal/design-system/actions
- Green checkmark = pipeline passed
- Red X = something failed → click on the run to see details
- If you set up a Teams webhook, you'll also get a Teams message

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Token Studio says "Push failed" | Your PAT may have expired. Regenerate it at github.com/settings/tokens and update the GH_PAT secret |
| Pipeline fails at "Generate components" | ANTHROPIC_API_KEY secret may be missing or invalid. Check github.com/NotTheVeal/design-system/settings/secrets/actions |
| Component name rejected | Make sure it's PascalCase — starts with a capital letter, no spaces or dashes |
| Tests fail on generated component | The AI-generated code had an issue. Check the GitHub Issue that was auto-created for details |
| I don't see Token Studio in Figma | Install it: Figma → Plugins → Browse plugins → search "Token Studio" → Install |

---

## Summary Checklist

- [ ] Created GitHub PAT at github.com/settings/tokens
- [ ] Added `ANTHROPIC_API_KEY` secret to GitHub repo
- [ ] Added `GH_PAT` secret to GitHub repo
- [ ] Configured Token Studio sync provider in Figma
- [ ] Enabled Auto-push in Token Studio
- [ ] Tested by making a small token change and confirming pipeline runs

Once all boxes are checked, your design-to-code pipeline is fully automated.
