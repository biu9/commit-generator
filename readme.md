# commit message generator

## 使用

目前粗糙的使用方案，后续可以考虑改成npm包发布

```typescript
import { generator } from "../src";

enum ModelProvider {
    azureOpenAI,
    openAI,
}

async function main() {
    const res = await generator({
        modelProvider: ModelProvider.azureOpenAI
    });

    console.log(res);
}

main();
```