import React from "react";

interface MemberInfoProps {
  memberId: string;
}

export default function MemberInfo({ memberId }: MemberInfoProps) {
  return <span>{memberId}</span>;
}
