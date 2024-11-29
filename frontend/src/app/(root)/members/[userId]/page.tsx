

export default async function MemberDetailPage(params : {
    userId : Promise<string>
}) {
  const userId = await params.userId; 
  console.log(userId);

  return (
    <div>
      {JSON.stringify(userId)}
    </div>
  );
}
